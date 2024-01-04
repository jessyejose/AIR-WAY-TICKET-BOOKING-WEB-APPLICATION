import React, { useState } from "react";
import Navbar from "./Navbar";
import {useNavigate} from "react-router-dom";
import Sidebar from "./Sidebar";


function Addflight() {
	const [flightName, setFlightName] = useState('');
	const [numSeats, setNumSeats] = useState('');
	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()
		let params = {
			flightname: flightName,
			numseats: numSeats,
		}
		fetch('http://localhost:4000/forminsert', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				"Content-Type": 'application/json'
			},
			body: JSON.stringify(params)
		}).then((res) => res.json()).then((result) => {
			navigate('/flight')
		})
	}

	return (
		<>
			<Navbar />
			<div class="container-fluid">
				<div class="row flex-nowrap" >
					<Sidebar/>

					<div class="col py-3" style={{ backgroundColor: '#e0f4ff' }} >				
							
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8f8f8', padding: '10px' }}>
							<p style={{ fontSize: '34px', margin: '0' }}><i><b>Hi, Welcome Back!</b></i></p>
							<p style={{ fontSize: '18px', margin: '0' }}><b>Table </b>&gt; Flight</p>
						</div>

						<br/><br/>
						
						<div style={{ backgroundColor: '#f8f8f8', padding: '10px' }}>
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
								<h2>Flight</h2>
							</div>
							<br/>
							<form onSubmit={handleSubmit} >
								<div style={{ marginBottom: '15px' }}>
									<label name="flightname" style={{ display: 'block', color: '#333', marginBottom: '5px' }}>
										Flight Name
									</label>
									<input type="text"  value={flightName} onChange={(e) => setFlightName(e.target.value)} style={{width: '100%',padding: '10px',fontSize: '16px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box',}}/>
								</div>
								<div style={{ marginBottom: '15px' }}>
									<label name="numseats" style={{ display: 'block', color: '#333', marginBottom: '5px' }}>
										Number of Seats
									</label>
									<input type="number" value={numSeats} onChange={(e) => setNumSeats(e.target.value)} style={{width: '100%',padding: '10px',fontSize: '16px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box',}}/>
								</div>
								<button type="submit" style={{width: '10%',padding: '10px',fontSize: '16px',backgroundColor: '#4CAF50',color: 'white',border: 'none',borderRadius: '5px'}}>
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
export default Addflight


