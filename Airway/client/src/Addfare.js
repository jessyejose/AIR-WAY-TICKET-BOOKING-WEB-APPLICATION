import React, { useState,useEffect } from "react";
import Navbar from "./Navbar";
import { Link ,useNavigate} from "react-router-dom";
import Sidebar from "./Sidebar";

function Addfare(){

	const [dataflight, setDataflight] = useState([])
	const [dataclass, setDataclass] = useState([])
	const [fare,setFare]=useState('')
	const [dataflightid,setDataflightId] = useState([])
	const [dataclassid, setDataclassid] = useState([])
	const navigate = useNavigate()



	useEffect(()=>{
		fetch('http://localhost:4000/flight').then((res)=>res.json())
		.then((result)=>{
		setDataflight(result)
		// console.log(result);
	
	})
	fetch('http://localhost:4000/class').then((res)=>res.json())
		.then((result)=>{
		setDataclass(result)
	
	})
	},[])
	const handleFormlookup = (e) => {
		e.preventDefault()
		let params = {
			flight: dataflightid,
			class:dataclassid,
			fare:fare

		}
		fetch('http://localhost:4000/fareinsert', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				"Content-Type": 'application/json'
			},
			body: JSON.stringify(params)
		}).then((res) => res.json())
		.then((result) => {
			// console.log(result);
			navigate('/fare')
			
		})
	}

	return(
		<>
		<Navbar/>
		<div class="container-fluid">
				<div class="row flex-nowrap" >
					<Sidebar/>

					<div class="col py-3" style={{ backgroundColor: '#e0f4ff' }} >					
						<br/><br/>
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8f8f8', padding: '10px' }}>
							<p style={{ fontSize: '34px', margin: '0' }}><i><b>Hi, Welcome Back!</b></i></p>
							<p style={{ fontSize: '18px', margin: '0' }}><b>Table </b>&gt; Fare</p>
						</div>

						<br /><br />
						<div style={{ backgroundColor: '#f8f8f8', padding: '10px' }}>
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
								<h2>Fare</h2>
							</div>
							<br/>
							<form onSubmit={handleFormlookup}  >
								<label style={{ display: 'block', color: '#333', marginBottom: '5px' }}>
									Flight_Name
								</label>
								<select name="flight"  style={{width: '100%',padding: '10px',fontSize: '16px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box'}} onChange={(e) => setDataflightId(e.target.value)}>
									<option>Select</option>
									{dataflight.map((value,index)=>{
										return(
										<>
										<option value={value._id}>{value.Flightname}</option>
										</>
									)
								})}	
								</select><br /><br />
								<label style={{ display: 'block', color: '#333', marginBottom: '5px' }}>
									Class_Name
								</label>
								<select name="class"  style={{width: '100%',padding: '10px',fontSize: '16px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box',}} onChange={(e) => setDataclassid(e.target.value)}>
									<option>Select</option>
									{dataclass.map((value,index)=>{
										return(
										<>
										<option value={value._id}>{value.Classname}</option>
										</>
									)
								})}	
								</select><br /><br />
								<label style={{ display: 'block', color: '#333', marginBottom: '5px' }}>
									Fare
								</label> 
								<input name='fare' type="number"value={fare}onChange={(e) => setFare(e.target.value)}style={{width: '100%',padding: '10px',fontSize: '16px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box',}}/>
								<button type="submit" style={{width: '10%',padding: '10px',fontSize: '16px',backgroundColor: '#4CAF50',color: 'white',border: 'none',borderRadius: '5px',cursor: 'pointer',}}>
									Submit
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default Addfare