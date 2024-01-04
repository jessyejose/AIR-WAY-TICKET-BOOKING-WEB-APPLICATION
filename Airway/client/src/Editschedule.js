import React, { useEffect, useState } from "react";
import {useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Editschedule(){
	const [dataflight, setDataflight] = useState([])
	const [arrivaldate,setArrivaldate]=useState('')
	const [arrivaltime,setArrivaltime]=useState('')
	const [departuredate,setDeparturedate]=useState('')
	const [departuretime,setDeparturetime]=useState('')
	const [returndate,setReturndate]=useState('')
	const [source,setSource]=useState('')
	const [destination,setDestination]=useState('')
	const [kilometer,setKilometer]=useState('')
	const [loyality,setLoyality]=useState('')
	const navigate = useNavigate()
	const location = useLocation()
	const [dataflightid,setDataflightId] = useState('')

	useEffect(()=>{
		fetch('http://localhost:4000/flight').then((res)=>res.json())
		.then((result)=>{
		setDataflight(result)
		// console.log(result);
	    })
		let params ={
			id:location.state.id
		}
		fetch('http://localhost:4000/editschedulebyid',{
			method:'post',
			headers:{
				Accept:'application/json',
				'Content-Type':'application/json'
			},
			body:JSON.stringify(params)
		}).then((res)=>res.json()).then((result)=>{
			setDataflightId(result.Flightname)
			setArrivaldate(result.Arrivaldate)
			setArrivaltime(result.Arrivaltime)
			setDeparturedate(result.Departuredate)
			setDeparturetime(result.Departuretime)
			setReturndate(result.Returndate)
			setSource(result.Source)
			setDestination(result.Destination)
			setKilometer(result.Kilometer)
			setLoyality(result.LoyalityPoint)
			// console.log(result)
		})
	},[location.state.id])
	const handleFormupdateschedule =  (e) => {
		e.preventDefault();
		let params = {
			flight: dataflightid,
			adate:arrivaldate,
			atime:arrivaltime,
			ddate:departuredate,
			dtime:departuretime,
			rdate:returndate,
			source:source,
			destination:destination,
			kilometer:kilometer,
			point:loyality,
		    id:location.state.id
		};
		 fetch('http://localhost:4000/scheduleedit', {
		  method: 'post',
		  headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(params),
		})
		  .then((res) => res.json())
		  .then((result) => {
			// console.log(result)
			navigate('/schedule')
		  });
	  };

	return(
		<>
		<Navbar />
		<div className="container-fluid">
		  <div className="row flex-nowrap">
  
			<Sidebar />
  
			<div className="col py-3" style={{ backgroundColor: '#e0f4ff' }}>
				<br/><br/>

				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8f8f8', padding: '10px' }}>
					<p style={{ fontSize: '34px', margin: '0' }}><i><b>Hi, Welcome Back!</b></i></p>
					<p style={{ fontSize: '18px', margin: '0' }}><b>Table </b>&gt; Schedule</p>
				</div>

				<br /><br />
				<div style={{ backgroundColor: '#f8f8f8', padding: '10px' }}>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<h2>Edit Schedule</h2>
					</div>
					<br/>
					<form  onSubmit={handleFormupdateschedule}>
						<div style={{ marginBottom: '15px' }}>
							<label style={{ display: 'block', color: '#333', marginBottom: '5px' }}>
								Flight_Name
							</label>
							<select name="flight"  style={{width: '100%',padding: '10px',fontSize: '16px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box'}} value={dataflightid}  onChange={(e) => setDataflightId(e.target.value)}>
								<option>Select</option>
								{dataflight.map((value,index)=>{
									return(
									<>
									<option value={value._id}>{value.Flightname}</option>
									</>
								)
							})}	
							</select><br />
							<label name="adate" style={{ display: 'block', color: '#333', marginBottom: '5px' }}>
								Arrival_date
							</label>
							<input type="date" value={arrivaldate} onChange={(e) => setArrivaldate(e.target.value)} style={{width: '100%',padding: '10px',fontSize: '16px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box',}}/><br />
							<label name="atime" style={{ display: 'block', color: '#333', marginBottom: '5px' }}>
								Arrival_time
							</label>
							<input type="time" value={arrivaltime} onChange={(e) => setArrivaltime(e.target.value)} style={{width: '100%',padding: '10px',fontSize: '16px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box',}}/><br />
							<label name="ddate" style={{ display: 'block', color: '#333', marginBottom: '5px' }}>
								Departure_date
							</label>
							<input type="date" value={departuredate} onChange={(e) => setDeparturedate(e.target.value)} style={{width: '100%',padding: '10px',fontSize: '16px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box',}}/><br />
							<label name="dtime" style={{ display: 'block', color: '#333', marginBottom: '5px' }}>
								Departure_time
							</label>
							<input type="time" value={departuretime} onChange={(e) => setDeparturetime(e.target.value)} style={{width: '100%',padding: '10px',fontSize: '16px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box',}}/><br />
							<label name="rdate" style={{ display: 'block', color: '#333', marginBottom: '5px' }}>
								Return_date
							</label>
							<input type="date" value={returndate} onChange={(e) => setReturndate(e.target.value)} style={{width: '100%',padding: '10px',fontSize: '16px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box',}}/><br />
							<label name="source" style={{ display: 'block', color: '#333', marginBottom: '5px' }}>
								Source
							</label>
							<input type="text" value={source} onChange={(e) => setSource(e.target.value)} style={{width: '100%',padding: '10px',fontSize: '16px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box',}}/><br />
							<label name="destination" style={{ display: 'block', color: '#333', marginBottom: '5px' }}>
								Destination
							</label>
							<input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} style={{width: '100%',padding: '10px',fontSize: '16px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box',}}/><br />
							<label name="kilometer" style={{ display: 'block', color: '#333', marginBottom: '5px' }}>
								Kilometer
							</label>
							<input type="text" value={kilometer} onChange={(e) => setKilometer(e.target.value)} style={{width: '100%',padding: '10px',fontSize: '16px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box',}}/><br />
							<label name="point" style={{ display: 'block', color: '#333', marginBottom: '5px' }}>
								Loyality Point
							</label>
							<input type="text" value={loyality} onChange={(e) => setLoyality(e.target.value)} style={{width: '100%',padding: '10px',fontSize: '16px',border: '1px solid #ccc',borderRadius: '5px',boxSizing: 'border-box',}}/><br />
					
							<button type="submit" style={{width: '10%',padding: '10px',fontSize: '16px',backgroundColor: '#4CAF50',color: 'white',border: 'none',borderRadius: '5px',cursor: 'pointer',}}>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
  
		  </div>
		</div>
	  </>
	)
}

export default Editschedule