import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'

function CreateCategory() {
  return (
    <Layout title={"Admin - CreateCategory"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3 mb-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            Create Category
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory