import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../contextApi/auth";

function Dashboard() {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title={"DashBoard - EcoMart"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3 mb-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card p-3 bg-light">
              <h5 style={{ fontWeight: "300" }}>Name: {auth?.user?.name}</h5>
              <h5 style={{ fontWeight: "300" }}>Email: {auth?.user?.email}</h5>
              <h5 style={{ fontWeight: "300" }}>
                Contact: {auth?.user?.phone}
              </h5>
              <h5 style={{ fontWeight: "300" }}>
                Address: {auth?.user?.address}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
