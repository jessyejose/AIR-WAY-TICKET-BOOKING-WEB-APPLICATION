import React, { useEffect, useState } from 'react';
import { useLocation,Link } from 'react-router-dom';
import UserNav from './UserNav';
import MyNavbar from './MyNavbar';

function Search() {
  const [scheduledata, setscheduledata] = useState([]);
  const location = useLocation();
  const searchInfo = location.state;

  useEffect(() => {
    fetch(`http://localhost:4000/viewschedule`)
      .then(response => response.json())
      .then(result => {
        setscheduledata(result);
      });
	//   console.log(searchInfo)
  }, []);

  const match = scheduledata.filter(scheduleItem =>
	scheduleItem.Source === searchInfo.source &&
	scheduleItem.Destination === searchInfo.destination &&
	scheduleItem.Departuredate === searchInfo.date
  );

  return (
    <>
      <UserNav />
      <div style={{ backgroundImage: `url(/air.jpg)`, width: '100vw', height: '100%', backgroundSize: 'cover' }}>
        <MyNavbar />
      </div>
      <div style={{ backgroundColor: '#f8f8f8', padding: '10px', width: '100vw', height: '100%' }}>
        {match.length > 0 ? (
          <table border="1" className="table">
            <thead>
              <tr>
                <th style={{ width: '12%' }}>FlightName</th>
                <th style={{ width: '12%' }}>Source</th>
                <th style={{ width: '12%' }}>Destination</th>
                <th style={{ width: '12%' }}>Departure Date</th>
                <th style={{ width: '12%' }}>Departure Time</th>
                <th style={{ width: '12%' }}>Arrival Date</th>
                <th style={{ width: '12%' }}>Arrival Time</th>
                <th style={{ width: '12%' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {match.map((item, index) => (
                <tr key={index}>
                  <td>{item.flightInfo.Flightname}</td>
                  <td>{item.Source}</td>
                  <td>{item.Destination}</td>
                  <td>{item.Departuredate}</td>
                  <td>{item.Departuretime}</td>
                  <td>{item.Arrivaldate}</td> 
                  <td>{item.Arrivaltime}</td>
                  <td><Link to='/check' state={{item}} style={{ background: 'green', color: 'white', padding: '10px', textDecoration: 'none', borderRadius: '5px' }}>check</Link></td>
                  {/* <td><button type="submit" style={{ width: '30%', padding: '10px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Check</button></td> */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>
            <img src="/noflight.jpg" style={{ width: '80%', height: '650px', margin: '0 auto', display: 'block' }} alt="noflight" />
            <p style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>No matching flights found!</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Search;

