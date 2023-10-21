// src/components/Dashboard.js
import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link to="/admin/users">Users</Link>
          </li>
          <li>
            <Link to="/admin/orders">Orders</Link>
          </li>
          <li>
            <Link to="/admin/workshops">Workshops</Link>
          </li>
          <li>
            <Link to="/admin/bikeads">Bike Ads</Link>
         </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
