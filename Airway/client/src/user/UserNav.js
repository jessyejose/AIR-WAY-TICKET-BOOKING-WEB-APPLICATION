import React from "react";
import { Link } from "react-router-dom";

function UserNav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'black', height: '20px' }}>
      <div className="container-fluid">
        <Link to='/feedback' style={{ color: 'white', textDecoration: 'none', fontSize: '15px' }}>
          <h3 style={{ color: 'white', textDecoration: 'none', fontSize: '15px',marginTop:'8px',marginLeft:'50px' }}>✈ Feedback</h3>
        </Link>
      </div>
    </nav>
  );
}

export default UserNav;

