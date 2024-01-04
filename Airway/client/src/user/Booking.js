import React, { useEffect, useState } from 'react';
import { useLocation,Link } from 'react-router-dom';
import UserNav from './UserNav';
import MyNavbar from './MyNavbar';

function Booking(){
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



	return(

		<>
		<UserNav />
		<div style={{ backgroundImage: `url(/air.jpg)`, width: '100vw', height: '100%', backgroundSize: 'cover' }}>
			<MyNavbar />
		</div>
		<div style={{ backgroundImage: `url(/air.jpg)`, textAlign: 'center', height: '120px', padding: '10px', color: '#000080',borderColor:'a0a0a0' }}>
			<h1 style={{  fontFamily: 'Georgia, Times New Roman, Times, serif', fontSize: '2em' }}>Booking details</h1>
			<p style={{ fontSize: '18px', margin: '0' }}><b>Home </b>➡️ Booking</p>
	    </div>
		<div style={{margin:'50px',padding:'50px'}}>
			<table border="1" className="table table-striped" >
				<thead>
					<tr>
						<th style={{ width: '20%' }}>Flight Name</th>
						<th style={{ width: '20%' }}>Class Name</th>
						<th style={{ width: '20%' }}>Fare</th>
						<th colSpan={3} style={{ width: '20%' }}>Action</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) => (
						<tr key={index}>
							<td>{item.flightInfo.Flightname}</td>
							<td>{item.classInfo.Classname}</td>
							<td>{item.Fare}</td>
							<td><button onClick={()=>handleDelete(item._id)} className="btn btn-danger">Cancel</button></td>
							<td><button  className="btn btn-primary">Finished</button></td>
							<td><button  className="btn btn-secondary">Download</button></td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
		</>
	)
}

export default Booking