import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import UserNav from './UserNav';
import MyNavbar from './MyNavbar';

function User() {
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);
  const [sourceid, setSourceid] = useState('');
  const [destinationid, setDestinationid] = useState('');
  const [data, setData] = useState([]);
  const [departuredate, setDepartureDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4000/scheduleview')
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setSource([...new Set(result.map((result) => result.Source))] || []);
      });
  }, []);  

  const handleFlightschedule = (e) => {
	e.preventDefault();
	let params = {
	  source: sourceid,
	  destination: destinationid,
	  date: departuredate,
	};
	navigate('/search', { state: params });
  };
  

  return (
    <>
      <UserNav />
      <div style={{ backgroundImage: `url(/air.jpg)`, width: '100vw', height: '100%', backgroundSize: 'cover' }}>
        <MyNavbar />
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', color: '#fff', padding: '50px 0', alignItems: 'center', margin: '0 auto' }}>
          <div style={{ textAlign: 'left', width: '50%', margin: '300px 50px 30px 50px' }}>
            <p style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)', fontSize: '1.5rem', lineHeight: '1.5' }}>
              LET YOUR DREAMS TAKE FLIGHT
            </p>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>AIRWAY TRAVELS</h1>
            <p style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)', fontSize: '1.2rem', lineHeight: '1.5' }}>
              We’re not just about getting you there, we want to make sure you have a great time. Leave your worries behind and let us help plan your trip. It’s more than just flights – it’s memories. See the world from our eyes.
            </p>
            <button className="btn btn-primary">
              LET'S GO
            </button>
          </div>
          <div style={{ textAlign: 'center', width: '40%', margin: '350px 50px 0px 0px', backgroundColor: 'white' }}>
            <h4 style={{ color: 'black', textAlign: 'left', margin: '25px 50px 0px 50px' }}>FLIGHTS</h4>
            <form onSubmit={handleFlightschedule} style={{ margin: '50px 50px' }}>
              <select name="source" style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box', marginBottom: '10px' }} onChange={(e) => {
                setSourceid(e.target.value);
                const selectedSource = e.target.value;
                const destinations = data.filter((value) => value.Source === selectedSource).map((value) => ({ _id: value._id, name: value.Destination }));
                setDestination(destinations || []);
              }}>
                <option>Select Source</option>
                {source.map((value, index) => (
                  <option key={index} value={value._id}>
                    {value}
                  </option>
                ))}
              </select><br />
              <select name="destination" style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box', marginBottom: '10px' }} onChange={(e) => setDestinationid(e.target.value)}>
                <option>Select Destination</option>
                {destination.map((value, index) => (
                  <option key={index} value={value.name}>
                    {value.name}
                  </option>
                ))}
              </select><br />
              <input name='date' type="date" onChange={(e) => setDepartureDate(e.target.value)} style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box', marginBottom: '10px' }} /><br />
              <button type="submit" style={{ width: '30%', padding: '10px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                SEARCH FLIGHT
              </button>
            </form>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#b0e0e6', color: '#fff', padding: '20px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 50px' }}>
          <div style={{ textAlign: 'left', width: '50%' ,margin:"30px 30px"}}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Discover more ways to earn, every day</h2>
            <hr style={{ border: 'none', borderTop: '2px solid #fff', margin: '10px 0' }} />
            <p style={{ fontSize: '1.2rem', lineHeight: '1.5' }}>
              Earning Airway points has never been easier. Earn whenever you shop or travel, and watch your points pile up!
            </p>
            <button className="btn btn-primary" style={{ padding: '15px 30px', fontSize: '1.2rem', borderRadius: '8px', marginTop: '30px', fontWeight: 'bold' }}>
              <Link to="" style={{ color: 'white' }}>Learn more</Link>
            </button>
          </div>
          <div style={{ textAlign: 'center', width: '50%',margin:"30px 30px" }}>
            <img src="/ball.png" alt="balloon" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#f5f5f5', color: 'black', padding: '50px 0', textAlign: 'center' , width: '100%'}}>
        <h2 style={{ fontSize: '3rem', marginBottom: '20px', fontWeight: 'bold' }}>More rewarding, more often</h2>
        <p style={{ fontSize: '1.5rem', lineHeight: '2' ,margin:"50px 50px"}}>
          Get to a flight reward faster, with more flexibility using your points. Choose from a variety of popular rewards for travel and beyond.
        </p>
        <button className="btn btn-primary" style={{ padding: '15px 30px', fontSize: '1.2rem', borderRadius: '8px', marginTop: '30px', fontWeight: 'bold' }}>
          Learn more
        </button>
      </div>

      <div style={{ backgroundColor: '#f0ffff', color: 'black', padding: '20px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 50px' }}>
          <div style={{ textAlign: 'center', width: '50%',margin:"30px 30px" }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Get more as a member with Airway credit cards</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.5' }}>
              More points on your purchases? Check. Preferred pricing? Check. Air Way travel benefits? Check! You can have it all with an eligible Aeroway credit card.
            </p>
            <button className="btn btn-primary" style={{ padding: '15px 30px', fontSize: '1.2rem', borderRadius: '8px', marginTop: '30px', fontWeight: 'bold' }}>
              Learn more
            </button>
          </div>
          <div style={{ textAlign: 'center', width: '50%',margin:"30px 30px" }}>
            <img src="/credit.jpg" alt="Aeroplan Credit Card" style={{ width: '100%', height: 'auto', marginBottom: '20px' }} />
          </div>
        </div>
      </div>

      <div style={{ width: '100%', backgroundColor: '#36454f', color: '#fff', padding: '50px 0', display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', width: '50%',margin:"30px 30px" }}>
            <img src="/mob.jpg" alt="Free Texting" style={{ maxWidth: '100%', height: 'auto', marginBottom: '20px' }} />
          </div>
          <div style={{ textAlign: 'center', width: '50%',margin:"30px 50px" }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Free Texting for Airway Members</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.5' }}>
              Message friends, family, and colleagues over Wi-Fi, while you fly.
            </p>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.5', marginBottom: '20px' }}>
              Sponsored by Bell.
            </p>
            <button className="btn btn-primary" style={{ padding: '15px 30px', fontSize: '1.2rem', borderRadius: '8px', marginTop: '30px', fontWeight: 'bold' }}>
              Learn more
            </button>
          </div>
        </div>
      </div>

      <div style={{ width: '100%', backgroundColor: '#aec6cf', color: '#fff', padding: '50px 0', display: 'flex', alignItems: 'center',height:'600px' }}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', width: '50%',margin:"30px 50px" }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Airway anywhere, anytime</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.5' }}>
              Take your Airway account on the go with the Airway app. Access your digital membership card, book flight rewards, view your Elite Status and transactions, explore offers, and more.
            </p>
            <button className="btn btn-primary" style={{ padding: '15px 30px', fontSize: '1.2rem', borderRadius: '8px', marginTop: '30px', fontWeight: 'bold' }}>
              Download now
            </button>
          </div>
          <div style={{ textAlign: 'center', width: '50%',margin:"30px 50px"}} >
            <img src="/aero.jpg" alt="Aeroplan App" style={{ width: '80%', height: '550px', marginBottom: '20px' }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default User;


