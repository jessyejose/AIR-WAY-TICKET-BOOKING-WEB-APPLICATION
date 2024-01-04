import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MyNavbar = () => {
  const [drop, setDrop] = useState(false);
  const airway = {
	color: '#595959',
	fontSize: '2.5rem',
	fontWeight: 'bold',
	textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
	letterSpacing: '2px',
  };
  return (
    <nav style={{ backgroundColor: 'transparent',width:'100%vw', padding: '15px', borderBottom: '1px solid rgba(255, 255, 255, 0.1),' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' ,margin:'20px 50px' }}>
        <Link to="/user" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem' }}>
          <span style={airway}>Airway</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/user" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>
            Home
          </Link>
          <Link to="/about" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>
            About
          </Link>
          <Link to="/booking" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>
            My Booking
          </Link>
          <Link to="/loyalty" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>
            Loyalty Points
          </Link>
          <div style={{ position: 'relative', cursor: 'pointer' }} onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}>
            <Link to="" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>
              Explore<span style={{fontSize:"10px"}}> ▼</span>
            </Link>
            {drop && (
              <div
                style={{position: 'absolute',top: '100%',left: 0,backgroundColor: 'light blue',display: 'flex',flexDirection: 'column',minWidth: '100px', }}>
                <Link to="/option1" style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>
                  Option 1
                </Link>
                <Link to="/option2" style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>
                  Option 2
                </Link>
              </div>
            )}
          </div>
          <Link to="/logout" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;
