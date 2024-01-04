import React from 'react';
import UserNav from './UserNav';
import MyNavbar from './MyNavbar';

function About() {
  return (
    <>
      <UserNav />
	  <div style={{ backgroundImage: `url(/air.jpg)`, width: '100vw', height: '100%', backgroundSize: 'cover' }}>
			<MyNavbar />
	  </div>
	  <div style={{ backgroundImage: `url(/air.jpg)`, textAlign: 'center', height: '120px', padding: '10px', color: '#000080',borderColor:'a0a0a0' }}>
		<h1 style={{  fontFamily: 'Georgia, Times New Roman, Times, serif', fontSize: '2em' }}>ABOUT</h1>
		<p style={{ fontSize: '18px', margin: '0' }}><b>Home </b>➡️ About</p>
	  </div>
	  <div style={{ padding: '20px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
		<h1 style={{ fontSize: '2rem', marginBottom: '20px', color: '#007bff' }}>About Airway Travels</h1>
		<p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '15px' }}>
			Welcome to Airway Travels, your go-to platform for seamless travel experiences. At Airway, we believe in
			connecting people and creating memorable journeys. Whether you're a frequent flyer or planning your first
			adventure, we're here to make your travel dreams take flight.
		</p>
		<h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#007bff' }}>Our Mission</h2>
		<p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '15px' }}>
			Our mission is to provide reliable and affordable air travel solutions, ensuring our passengers reach their
			destinations safely and with comfort. We strive to offer a wide range of destinations, flexible booking
			options, and exclusive rewards for our loyal travelers.
		</p>
		<h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#007bff' }}>Why Choose Airway?</h2>
		<ul style={{ listStyleType: 'none', padding: '0', textAlign: 'center', marginBottom: '20px' }}>
			<li style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>Extensive network of destinations</li>
			<li style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>Competitive and transparent pricing</li>
			<li style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>Comfortable and modern fleet of aircraft</li>
			<li style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>Flexible booking options</li>
			<li style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>Rewards program for frequent travelers</li>
		</ul>
		<h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#007bff' }}>Contact Us</h2>
		<p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
			Have questions or need assistance? Our customer support team is available 24/7. Feel free to reach out to us at
			<a href="mailto:support@airwaytravels.com"> support@airwaytravels.com</a> or call us at 1-800-AIRWAY.
		</p>
      </div>
    </>
  );
}

export default About;
