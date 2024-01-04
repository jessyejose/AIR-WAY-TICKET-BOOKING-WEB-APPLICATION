import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark " style={{ backgroundColor: '#39a7ff' }}>
			<div className="container-fluid">
				<Link to='/' style={{ color: 'white', padding: '10px', textDecoration: 'none',borderRadius: '5px' }}><h3>✈️ AIRWAY</h3></Link>

				<form className="d-flex justify-content-between">
					<Link to='/user' style={{ color: 'purple', padding: '10px', textDecoration: 'none',borderRadius: '5px' }}><h4><b>User</b></h4></Link>&nbsp;&nbsp;&nbsp;
					<input className="form-control mr-sm-2" type="search" placeholder="Search...." aria-label="Search" />&nbsp;
					<button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
				</form>

			</div>
		</nav>
	);
}

export default Navbar;
