import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import UserNav from './UserNav';
import MyNavbar from './MyNavbar';

function Submit(){
	const location = useLocation();
    const userInfo = location.state;
	useEffect(() => {
		console.log(userInfo)
	  }, []);

  return(


	<>
	<UserNav />

	<div style={{ backgroundImage: `url(/air.jpg)`, width: '100%', height: '100%', backgroundSize: 'cover' }}>
		<MyNavbar />
	</div>
	
	<div style={{  background: 'linear-gradient(to bottom, #ffdab9, #fff4ee)', width: '65%',margin:'100px 230px',marginBottom:'50px' }}>
		<br/>
		<h2 style={{ textAlign: 'center'}}>REVIEW JOURNEY</h2>
		<hr style={{backgroundColor:'#ff7a05',height:'2px'}}/>
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<div style={{ textAlign: 'left', margin: '50px' }}>
				<p><b>Flight Name:</b> {`${userInfo.passengers[0].flightName}`}</p>
				<p><b>Source:</b> {`${userInfo.passengers[0].source}`}</p>
				<p><b>Arrival Date:</b> {`${userInfo.passengers[0].arrivalDate}`}</p>
				<p><b>Arrival Time:</b> {`${userInfo.passengers[0].arrivalTime}`}</p>
			</div>
			<div style={{ textAlign: 'left', margin: '50px', }}>
				<p><b>Class:</b> {`${userInfo.passengers[0].className}`}</p>
				<p><b>Destination:</b> {`${userInfo.passengers[0].destination}`}</p>
				<p><b>Departure Date:</b> {`${userInfo.passengers[0].departureDate}`}</p>
				<p><b>Departure Time:</b> {`${userInfo.passengers[0].departureTime}`}</p>
			</div>
        </div>
		<h4 style={{marginLeft:"50px"}}>Passenger Details</h4>
		<div style={{marginLeft:"45px"}}>
			{userInfo.passengers.map((passenger, index) => (
				<div key={index} style={{ textAlign: 'left', margin: '10px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
					<p><b>Name:</b> {`${passenger.name}`}</p>
					<p><b>Age:</b> {`${passenger.age}`}</p>
					<p><b>Aadhar:</b> {`${passenger.aadhar}`}</p>
					<p><b>Password:</b> {`${passenger.password}`}</p>
					<p><b>Food:</b> {`${passenger.food}`}</p>
				    <br/>
				</div>
			))}
        </div>
		<div style={{ display: 'flex', justifyContent: 'space-between',marginBottom:'50px' }}>
			<button style={{ backgroundColor: 'orange', color: 'white', padding: '5px', borderRadius: '5px',marginLeft:"50px" , border: 'none'}}>Cancel</button>
			<button style={{ backgroundColor: 'green', color: 'white', padding: '5px', borderRadius: '5px',marginRight:"50px", border: 'none' }}>Payment</button>
		</div>
		<div style={{visibility:'hidden'}}>
			<p>hide</p>
		</div>
	</div>	
	</>
  )
}

export default Submit