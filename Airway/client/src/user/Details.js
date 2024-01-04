import React, { useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import UserNav from './UserNav';
import MyNavbar from './MyNavbar';

function Details() {
  const location = useLocation();
  const Info = location.state;
  const navigate = useNavigate();
  const [availableSeat, setAvailableSeat] = useState(Info.searchInfo.item.flightInfo.Seat); 
  const [numPassengers, setNumPassengers] = useState('');
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
	// console.log(Info)
    fetch('http://localhost:4000/food')
      .then((res) => res.json())
      .then((result) => setData(result));
  }, []);

  const handleNumPassengersChange = (e) => {
    const numPassengers = parseInt(e.target.value, 10);
    setNumPassengers(numPassengers);

    const { className, flightDetails } = Info;

    const passengers = Array.from({ length: numPassengers }, (_, index) => {
      const flightDetail = flightDetails[0] || {};
      return {
        name: '',
        age: '',
        aadhar: '',
        password: '',
        food: '',
        className: className,
        arrivalDate: flightDetail.arrivalDate || '',
        arrivalTime: flightDetail.arrivalTime || '',
        departureDate: flightDetail.departureDate || '',
        departureTime: flightDetail.departureTime || '',
        destination: flightDetail.destination || '',
        fare: flightDetail.fare || '',
        flightName: flightDetail.flightName || '',
        returnDate: flightDetail.returnDate || '',
        source: flightDetail.source || '',
      };
    });
    setPassengerDetails(passengers);
  };

  const handlePassengerDetailsChange = (index, field, value) => {
    const updatedPassengers = [...passengerDetails];
    updatedPassengers[index][field] = value;
    setPassengerDetails(updatedPassengers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = {
      number: numPassengers,
      passengers: passengerDetails,
    };
    fetch('http://localhost:4000/passenger', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
			const updatedAvailableSeats = availableSeat - numPassengers;
			fetch('http://localhost:4000/updateSeats', {
				method: 'post',
				headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				},
				body: JSON.stringify({
				flightName: Info.searchInfo.item.flightInfo.Flightname,
				updatedSeats: updatedAvailableSeats,
				}),
			})
			.then((res) => res.json())
			.then((updateResult) => {
			console.log('Update Seats Result:', updateResult);
		setAvailableSeat(updatedAvailableSeats);
		setNumPassengers('');
		setPassengerDetails([]);
		navigate('/submit', { state:  params  });  
		});
	});
  };

  return (
    <>
      <UserNav />
      <div style={{ backgroundImage: `url(/air.jpg)`, width: '100vw', height: '100%', backgroundSize: 'cover' }}>
        <MyNavbar />
      </div>

      <form onSubmit={handleSubmit}>
        <label name="seat" style={{ width: '200px', color: '#333', display: 'inline-block', margin: '20px', marginLeft: '200px', marginTop: '50px' }}> Available Seat:</label>
        <input type="text" value={availableSeat} readOnly style={{ width: '50%', padding: '10px', fontSize: '12px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box' }} />
        <br />
        <br />

        <label name="number" style={{ width: '200px', color: '#333', display: 'inline-block', margin: '20px', marginLeft: '200px' }}> Number of Passengers:</label>
        <input type="number" value={numPassengers} onChange={handleNumPassengersChange} style={{ width: '50%', padding: '10px', fontSize: '12px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box' }} />
        <br />
        <br />
        {passengerDetails.map((passenger, index) => (
          <div key={index} style={{ border: '1px solid #ccc', width: '50%', margin: '40px' }}>
            <label name="name" style={{ color: '#333', display: 'inline-block', margin: '20px', marginTop: '50px', width: '100px' }}> Name:</label>
            <input type="text" value={passenger.name} onChange={(e) => handlePassengerDetailsChange(index, 'name', e.target.value)} style={{ width: '50%', padding: '10px', fontSize: '12px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box' }} />
            <br />
            <br />
            <label name="age" style={{ width: '100px', color: '#333', display: 'inline-block', margin: '20px', marginTop: '50px' }}> Age:</label>
            <input type="number" value={passenger.age} onChange={(e) => handlePassengerDetailsChange(index, 'age', e.target.value)} style={{ width: '50%', padding: '10px', fontSize: '12px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box' }} />
            <br />
            <br />
            <label name="aadhar" style={{ width: '100px', color: '#333', display: 'inline-block', margin: '20px', marginTop: '50px' }}> Aadhar:</label>
            <input type="number" value={passenger.aadhar} onChange={(e) => handlePassengerDetailsChange(index, 'aadhar', e.target.value)} style={{ width: '50%', padding: '10px', fontSize: '12px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box' }} />
            <br />
            <br />
            <label name="password" style={{ width: '100px', color: '#333', display: 'inline-block', margin: '20px', marginTop: '50px' }}> Password:</label>
            <input type="password" value={passenger.password} onChange={(e) => handlePassengerDetailsChange(index, 'password', e.target.value)} style={{ width: '50%', padding: '10px', fontSize: '12px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box' }} />
            <br />
            <br />
            <label style={{ width: '100px', display: 'inline-block', color: '#333', marginBottom: '5px', margin: '20px' }}>Food:</label>
            <select name="food" style={{ width: '50%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box' }} onChange={(e) => handlePassengerDetailsChange(index, 'food', e.target.value)}>
              <option>Select Food</option>
              {data.map((value, index) => (
                <option key={index} value={value.Specialization}>
                  {value.Specialization}
                </option>
              ))}
            </select>
            <br />
            <br />
          </div>
        ))}
        <button type="submit" style={{ width: '100%', padding: '10px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}> Submit</button>
      </form>
    </>
  );
}

export default Details;
