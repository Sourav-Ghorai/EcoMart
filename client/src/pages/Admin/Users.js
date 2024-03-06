import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

function Users() {
  return (
    <Layout title={"Admin - All Users"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3 mb-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">Users</div>
        </div>
      </div>
    </Layout>
  );
}

export default Users;
