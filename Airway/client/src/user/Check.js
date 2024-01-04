import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import UserNav from './UserNav';
import MyNavbar from './MyNavbar';

function Check() {
  const location = useLocation();
  const searchInfo = location.state;
  const [fareinfo, setfareinfo] = useState([]);

  useEffect(() => {
    // console.log('searchInfo:', searchInfo);

    fetch('http://localhost:4000/view')
      .then((res) => res.json())
      .then((result) => {
        setfareinfo(result);
        // console.log(result, 'all');
      });
  }, []);

	const organizedData = {};
	fareinfo.forEach((item) => {
		const className = item.classInfo.Classname;
		organizedData[className] = organizedData[className] || [];
		organizedData[className].push(item);
	});

  return (
    <>
      <UserNav />

      <div style={{ backgroundImage: `url(/air.jpg)`, width: '100vw', height: '100%', backgroundSize: 'cover' }}>
        <MyNavbar />
      </div>

	  <div>
		<h1 style={{textAlign:'center',padding:'100px',color:'#001E93'}}>We Provide Affordable Services</h1>

		{Object.entries(organizedData).map(([className, classData]) => (
			<div key={className} style={{ textAlign: 'center', padding: '20px',  }}>
				<h2 style={{color: '#000080',background:'#4DC5DB'}}>{className}</h2>
				<hr/>
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', color: '#324ab2', textAlign: 'left' }}>
					<div style={{ width: '30%', marginLeft: '50px' }}>
						{classData
						.filter(item => item.flightInfo.Flightname === searchInfo.item.flightInfo.Flightname)
						.map(filteredItem => (
							<div key={filteredItem._id}>
							<strong>Flight Name:</strong> {filteredItem.flightInfo.Flightname} <br /> <br />
							<strong>Arrival Date:</strong> {searchInfo.item.Arrivaldate} <br /> <br />
							<strong>Source:</strong> {searchInfo.item.Source} <br /> <br />
							</div>
						))}
					</div>
					<div style={{ width: '30%' }}>
						{classData
						.filter(item => item.flightInfo.Flightname === searchInfo.item.flightInfo.Flightname)
						.map(filteredItem => (
							<div key={filteredItem._id}>
							<strong>Departure Date:</strong> {searchInfo.item.Departuredate} <br /> <br />
							<strong>Arrival Time:</strong> {searchInfo.item.Arrivaltime} <br /> <br />
							<strong>Destination:</strong> {searchInfo.item.Destination} <br /> <br />
							</div>
						))}
					</div>
					<div style={{ width: '30%' }}>
						{classData
						.filter(item => item.flightInfo.Flightname === searchInfo.item.flightInfo.Flightname)
						.map(filteredItem => (
							<div key={filteredItem._id}>
								<strong>Departure Time:</strong> {searchInfo.item.Departuretime} <br /> <br />
								<strong>Return Date:</strong> {searchInfo.item.Returndate} <br /> <br />
								<strong>Fare:</strong> {filteredItem.Fare} <br /> <br />
							</div>
						))}
					</div>
					<div style={{ width: '15%' }}>
						<br /> <br />
						<Link to='/details' state={{ searchInfo,className, flightDetails: classData.filter(item => item.flightInfo.Flightname === searchInfo.item.flightInfo.Flightname).map(filteredItem => ({ flightName: filteredItem.flightInfo.Flightname, arrivalDate: searchInfo.item.Arrivaldate, source: searchInfo.item.Source, departureDate: searchInfo.item.Departuredate, arrivalTime: searchInfo.item.Arrivaltime, destination: searchInfo.item.Destination, departureTime: searchInfo.item.Departuretime, returnDate: searchInfo.item.Returndate, fare: filteredItem.Fare, })) }} style={{ background: 'green', color: 'white', padding: '10px', textDecoration: 'none', borderRadius: '5px' }}>Passenger Details</Link>
					</div>
				</div>

			</div>
        ))}


	  </div>
    </>
  );
}

export default Check;

