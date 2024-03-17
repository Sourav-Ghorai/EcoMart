import React from "react";
import { Link, NavLink } from "react-router-dom";

function AdminMenu() {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <Link to="/dashboard/admin" className="dashboard-title">
            Admin Panel
          </Link>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
          >
            All Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
          >
            All Orders
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default AdminMenu;
