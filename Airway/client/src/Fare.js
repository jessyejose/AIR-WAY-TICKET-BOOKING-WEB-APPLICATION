import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

function Fare() {
	const [data, setData] = useState([])
	const [refresh, setRefresh] = useState(0)

	useEffect(() => {
		fetch('http://localhost:4000/view').then((res) =>
			res.json()
		).then((result) =>
			setData(result)
			// console.log(result)
		)
	}, [refresh])

	const handleDelete = (iD) => {
		let params = {
			id: iD
		}
		fetch('http://localhost:4000/deletefare', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(params)
		}).then((res) => res.json()).then((result) => {
			setRefresh((previous) => previous + 1)
		})
	}

	return (
		<>
			<Navbar />
			<div class="container-fluid">
				<div class="row flex-nowrap" >
					<Sidebar/>

					<div class="col py-3" style={{ backgroundColor: '#e0f4ff' }} >
						<br /><br />
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8f8f8', padding: '10px' }}>
							<p style={{ fontSize: '34px', margin: '0' }}><i><b>Hi, Welcome Back!</b></i></p>
							<p style={{ fontSize: '18px', margin: '0' }}><b>Table </b>&gt; Fare</p>
						</div>
						<br /><br />

						<div style={{ backgroundColor: '#f8f8f8', padding: '10px' }}>
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
								<h2>Table</h2>
								<Link to='/fareadd' style={{ background: 'green', color: 'white', padding: '10px', textDecoration: 'none', borderRadius: '5px' }}>Fare</Link>
							</div>
							<br />
							<div>
								<table border="1" className="table table-striped">
									<thead>
										<tr>
											<th style={{ width: '20%' }}>Sl. No</th>
											<th style={{ width: '20%' }}>Flight Name</th>
											<th style={{ width: '20%' }}>Class Name</th>
											<th style={{ width: '20%' }}>Fare</th>
											<th colSpan={2} style={{ width: '20%' }}>Action</th>
										</tr>
									</thead>
									<tbody>
										{data.map((item, index) => (
											<tr key={index}>
												<td>{index + 1}</td>
												<td>{item.flightInfo.Flightname}</td>
												<td>{item.classInfo.Classname}</td>

												<td>{item.Fare}</td>
												<td><Link to="/fareedit" state={{id:item._id}} style={{background: '#007bff',color: 'white',padding: '7px',textDecoration: 'none',borderRadius: '5px',display: 'inline-block',}}>Edit</Link></td>
												<td><button onClick={()=>handleDelete(item._id)} className="btn btn-danger">delete</button></td>
											</tr>
										))}
									</tbody>
								</table>
							</div>

							</div>
						</div>
					</div>
				</div>

			</>
			)
}
export default Fare