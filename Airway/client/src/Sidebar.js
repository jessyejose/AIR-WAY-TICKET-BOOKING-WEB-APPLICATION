import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import './styles.css';

const Sidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    const pathname = location.pathname;
    setActiveItem(pathname);
  }, [location]);

  return (
    <div
	className="col-auto col-md-3 col-xl-2 px-sm-2 px-0"
      style={{ backgroundColor: "#87c4ff",}}
    >
      <div
        className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100"
      >
		<br/>
        <ul className="nav" style={{ display: "block" }}>
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link align-middle px-0 ${activeItem === "/" ? "active-link" : ""}`}
            >
              <i className="fs-4 bi-house"></i>
              <h5>📈 Dashboard</h5>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/flight"
              className={`nav-link align-middle px-0 ${activeItem && activeItem.startsWith("/flight") ? "active-link" : ""}`}
            >
              <i className="fs-4 bi-house"></i>
              <h5>✈ Flight</h5>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/class"
              className={`nav-link align-middle px-0 ${activeItem && activeItem.startsWith("/class") ? "active-link" : ""}`}
            >
              <i className="fs-4 bi-house"></i>
              <h5>💺 Class</h5>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/fare"
              className={`nav-link align-middle px-0 ${activeItem && activeItem.startsWith("/fare") ? "active-link" : ""}`}
            >
              <i className="fs-4 bi-house"></i>
              <h5>💳 Fare</h5>
            </Link>
          </li>
		  <li className="nav-item">
            <Link
              to="/package"
              className={`nav-link align-middle px-0 ${activeItem && activeItem.startsWith("/package") ? "active-link" : ""}`}
            >
              <i className="fs-4 bi-house"></i>
              <h5>📦 Special Packages</h5>
            </Link>
          </li>
		  <li className="nav-item">
            <Link
              to="/schedule"
              className={`nav-link align-middle px-0 ${activeItem && activeItem.startsWith("/schedule") ? "active-link" : ""}`}
            >
              <i className="fs-4 bi-house"></i>
              <h5>🛩️ Schedule</h5>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
