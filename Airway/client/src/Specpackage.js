import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import {useNavigate,Link} from "react-router-dom";
import Sidebar from "./Sidebar";


function Specpackage(){
	const [packageName, setPackageName] = useState('');
	const [datapackage, setDatapackage] = useState([])
	const [datapackageid,setDatapackageId] = useState([]);
	const [specialization,setSpecialization]=useState('');
	const [price,setPrice]=useState('')
	const [image,setImage]=useState();
	const [data, setData] = useState([]);
	const [refresh, setRefresh] = useState(0)


	const navigate = useNavigate()

	useEffect(()=>{
		fetch('http://localhost:4000/package').then((res)=>res.json())
		.then((result)=>{
		setDatapackage(result)
		// console.log(result);	
	})
	fetch('http://localhost:4000/viewpackage').then((res) =>
			res.json()
		).then((result) =>
			setData(result)
			// console.log(result)
		)
	},[refresh])

	const handleSubmit = (e) => {
		e.preventDefault()
		let params = {
			package: packageName,
		}
		fetch('http://localhost:4000/packageinsert', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				"Content-Type": 'application/json'
			},
			body: JSON.stringify(params)
		}).then((res) => res.json()).then((result) => {
			setPackageName('');
			setRefresh((previous)=>previous+1)
			navigate('/package')
		})
	}

	const handleFormpackage = (e) => {
		e.preventDefault()
		let formData = new FormData();
		formData.append('selectpackage', datapackageid);
		formData.append('specialization',specialization);
		formData.append('price', price);
		formData.append('image', image);
		fetch('http://localhost:4000/selectpackageinsert', {
			method: 'POST',
			body: formData
		})
		.then((res) => res.json())
		.then((result) => {
			e.target.reset();
			// setDatapackageId('');
			setSpecialization('');
			setPrice('');
			// setImage('');
			setRefresh((previous)=>previous+1)
			navigate('/package')			
		})
	}

	
	const handleDelete = (iD)=>{
		let params = {
			id:iD
		}
		fetch('http://localhost:4000/packagedelete',{
			method:'post',
			headers:{
				Accept :'application/json',
				'Content-Type':'application/json'
			},
			body:JSON.stringify(params)
		}).then((res)=>res.json()).then((result)=>{
			setRefresh((previous)=>previous+1)
		})
	}


	

	
	
	return(

		<>
		<Navbar />
		<div class="container-fluid">
			<div class="row flex-nowrap" >
				<Sidebar/>

				<div class="col py-3" style={{ backgroundColor: '#e0f4ff' }} >
					<br /><br />
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8f8f8', padding: '10px' }}>
						<p style={{ fontSize: '34px', margin: '0' }}><i><b>Hi, Welcome Back!</b></i></p>
						<p style={{ fontSize: '18px', margin: '0' }}><b>Table </b>&gt; Special Package</p>
					</div>
					<br /><br />

					<div style={{ backgroundColor: '#f8f8f8', padding: '10px' }}>
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
							<div style={{width:'50%',backgroundColor:'#eeeeee',borderRadius:'10px',margin:'10px'}}>
								<form onSubmit={handleSubmit} >
									<div style={{ margin:'15px'}}>
										<label name="package"  style={{ display: 'block', color: '#333', marginTop:'83px' ,marginBottom:'10px'}}>
											Package Name
										</label>
										<input type="text" value={packageName} onChange={(e) => setPackageName(e.target.value)} style={{width: '100%',padding: '10px',fontSize: '16px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box',marginBottom:'10px'}}/><br/>
										<button type="submit" style={{width: '25%',padding: '10px',fontSize: '16px',backgroundColor: '#4CAF50',color: 'white',border: 'none',borderRadius: '5px',cursor: 'pointer',marginBottom:'83px'}}>
											Add Package
										</button>
									</div>
								</form>
							</div>
							<div style={{width:'50%',backgroundColor:'#eeeeee',borderRadius:'10px',margin:'10px'}}>
								<form onSubmit={handleFormpackage}  >
								<div style={{ margin:'15px'}}>
									<select name="selectpackage"  style={{width: '100%',padding: '10px',fontSize: '16px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box'}} onChange={(e) => setDatapackageId(e.target.value)}>
										<option>--Select_Package--</option>
										{datapackage.map((value,index)=>{
											return(
											<>
											<option value={value._id}>{value.PackageName}</option>
											</>
										)
									})}	
									</select><br /><br />									
									<input type="text" name="specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} placeholder='Enter Specialization' style={{width: '100%',padding: '10px',fontSize: '16px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box',marginBottom:'10px'}}/><br/>
									<input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter Price' style={{width: '100%',padding: '10px',fontSize: '16px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box',marginBottom:'10px'}}/><br/>
									<input type="file" name="image"  onChange={(e) => setImage(e.target.files[0])} style={{width: '100%',padding: '10px',fontSize: '16px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box',marginBottom:'10px'}}/><br />
									<button type="submit" style={{width: '15%',padding: '10px',fontSize: '16px',backgroundColor: '#4CAF50',color: 'white',border: 'none',borderRadius: '5px',cursor: 'pointer'}}>
										Submit
									</button>
								</div>
								</form>
							</div>
						</div>
						<br />
					</div>

					<br /><br />

					<div style={{ backgroundColor: '#f8f8f8', padding: '10px' }}>
						<h2>Table</h2>								
						<br />
						<div>
							<table border="1" className="table table-striped">
								<thead>
									<tr>
										<th style={{ width: '20%' }}>Sl. No</th>
										<th style={{ width: '20%' }}>Package Name</th>
										<th style={{ width: '20%' }}>Specialization</th>
										<th style={{ width: '20%' }}>Price</th>
										<th style={{ width: '20%' }}>Image</th>
										<th colSpan={2} style={{ width: '20%' }}>Action</th>
									</tr>
								</thead>
								<tbody>
								{data.map((item, index) => {
									console.log(item.Image);
									return (
										<tr key={item._id}>
											<td>{index + 1}</td>
											<td>{item.packageInfo.PackageName}</td>
											<td>{item.Specialization}</td>
											<td>{item.Price}</td>
											<td><img src={`http://localhost:4000/public/${item.Image}`} alt="error" width="100" height="100" /></td>
											<td><Link to="/packageedit" state={{id:item._id}} style={{background: '#007bff',color: 'white',padding: '7px',textDecoration: 'none',borderRadius: '5px',display: 'inline-block',}}>Edit</Link></td>
											<td><button onClick={()=>handleDelete(item._id)} className="btn btn-danger">delete</button></td>
										</tr>
									);
								})}


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

export default Specpackage