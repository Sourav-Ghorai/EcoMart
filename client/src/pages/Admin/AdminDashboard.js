import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../contextApi/auth";

function AdminDashboard() {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title={"Admin Dashboard - EcoMart"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3 mb-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card p-3">
              <h5>Admin Name: {auth?.user?.name}</h5>
              <h5>Admin Email: {auth?.user?.email}</h5>
              <h5>Admin Contact: {auth?.user?.phone}</h5>
              <h5>Admin Address: {auth?.user?.address}</h5>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
