import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../contextApi/auth'

function HomePage() {
   const [auth, setAuth] = useAuth();
  return (
    <Layout title={"EcoMart - Best Offers"}>
      <h1>Home Page</h1>
      {/* <p>{JSON.stringify(auth)}</p> */}
    </Layout>
  )
}

export default HomePage