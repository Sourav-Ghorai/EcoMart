import React from "react";
import { Link, NavLink } from "react-router-dom";

function UserMenu() {
  return (
    <>
      <div className="text-center dashboard">
        <div className="list-group dashboard-menu">
          <Link to="/dashboard/user" className="dashboard-title">
            Dashboard
          </Link>
          {/* <h4>Dashboard</h4> */}
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default UserMenu;
