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
          <div className="col-md-6">
            <div className="card p-3 bg-light">
              <h5 style={{ fontWeight: "300" }}>
                Admin Name: {auth?.user?.name}
              </h5>
              <h5 style={{ fontWeight: "300" }}>
                Admin Email: {auth?.user?.email}
              </h5>
              <h5 style={{ fontWeight: "300" }}>
                Admin Contact: {auth?.user?.phone}
              </h5>
              <h5 style={{ fontWeight: "300" }}>
                Admin Address: {auth?.user?.address}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
