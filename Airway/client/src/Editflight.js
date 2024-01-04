import React, { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Editflight(){
	const location = useLocation()
	const navigate = useNavigate()
	const [flightName, setFlightName] = useState('');
	const [numSeats, setNumSeats] = useState('');

	
	useEffect(()=>{
		let params ={
			id:location.state.id
		}
		fetch('http://localhost:4000/editbyid',{
			method:'post',
			headers:{
				Accept:'application/json',
				'Content-Type':'application/json'
			},
			body:JSON.stringify(params)
		}).then((res)=>res.json()).then((result)=>{
			setFlightName(result.Flightname)
			setNumSeats(result.Seat)
		})
	},[location.state.id])

	const handleUpdate =  (e) => {
		e.preventDefault();
		let params = {
			flightname: flightName,
			numseats: numSeats,
		  id:location.state.id
		};
		 fetch('http://localhost:4000/flightedit', {
		  method: 'post',
		  headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(params),
		})
		  .then((res) => res.json())
		  .then((result) => {
			navigate('/flight')
		  });
	  };

	return(
		<>
			<Navbar />

			<div class="container-fluid">
				<div class="row flex-nowrap" >
					<Sidebar/>

					<div class="col py-3" style={{ backgroundColor: '#e0f4ff' }} >
					<br/><br/>

					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8f8f8', padding: '10px' }}>
						<p style={{ fontSize: '34px', margin: '0' }}><i><b>Hi, Welcome Back!</b></i></p>
						<p style={{ fontSize: '18px', margin: '0' }}><b>Table </b>&gt; Flight</p>
					</div>

					<br /><br />
					<div style={{ backgroundColor: '#f8f8f8', padding: '10px' }}>
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
								<h2>Edit Flight</h2>
							</div>
							<br/>
							<form onSubmit={handleUpdate} >
								<div style={{ marginBottom: '15px' }}>
									<label name="flightname" style={{ display: 'block', color: '#333', marginBottom: '5px' }}>
										Flight Name
									</label>
									<input type="text" id="flightName" value={flightName} onChange={(e) => setFlightName(e.target.value)} style={{width: '100%',padding: '10px',fontSize: '16px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box',}}/>
								</div>
								<div style={{ marginBottom: '15px' }}>
									<label name="numseats" style={{ display: 'block', color: '#333', marginBottom: '5px' }}>
										Number of Seats
									</label>
									<input type="number" value={numSeats} onChange={(e) => setNumSeats(e.target.value)} style={{width: '100%',padding: '10px',fontSize: '16px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box',}}/>
								</div>
								<button
									type="submit"
									style={{width: '10%',padding: '10px',fontSize: '16px',backgroundColor: '#4CAF50',color: 'white',border: 'none',borderRadius: '5px',cursor: 'pointer',
									}}
								>
									Update
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		
		</>
	)
}
export default Editflight


