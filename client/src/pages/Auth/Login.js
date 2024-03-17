import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./../../Styles/AuthStyles.css";
import { useAuth } from "../../contextApi/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  //Handle form submission
  const handleSubmit = async (e) => {
    //Prevent the default submit functionality
    e.preventDefault();
    try {
      //Post request to the server
      const result = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (result.data.success) {
        //Show success popup
        toast.success(result.data && result.data.message);

        //Set the user and token through context api
        setAuth({
          ...auth, //spread operator to keep the input data as it is
          user: result.data.user,
          token: result.data.token,
        });

        //Save the user data locally after login
        localStorage.setItem("auth", JSON.stringify(result.data));

        //Navigate to home page
        navigate(location.state || "/");
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Register in EcoMart"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <p className="title">Login Form</p>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-dark my-2"
            style={{ width: "100%" }}
          >
            Log in
          </button>
          <div className="mt-3">
            <button
              type="submit"
              className="btn btn-light"
              style={{ width: "100%" }}
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default Login;
