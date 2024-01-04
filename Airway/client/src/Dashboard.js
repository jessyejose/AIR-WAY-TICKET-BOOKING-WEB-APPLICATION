import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row flex-nowrap">

          <Sidebar />

          <div className="col py-3" style={{ backgroundColor: '#e0f4ff' }}>
              <img src="/dashboard.png" style={{ width: '100%', height: '100%' }} alt="Dashboard" />
          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;
