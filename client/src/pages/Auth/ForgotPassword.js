import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import "./../../Styles/AuthStyles.css";

function ForgotPassword() {

   const [email, setEmail] = useState("");
   const [newPassword, setnewPassword] = useState("");
   const [answer, setAnswer] = useState("");
   const navigate = useNavigate();

  //Handle form submission
  const handleSubmit = async (e) => {
    //Prevent the default submit functionality
    e.preventDefault();
    try {
      //Post request to the server
      const result = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email, answer , newPassword}
      );
      if (result.data.success) {
        //Show success popup
        toast.success(result.data && result.data.message);

        //Navigate to home page
        navigate("/login");
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Forgot Password - EcoMart"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <p className="title">Reset Password</p>
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
              value={newPassword}
              onChange={(e) => setnewPassword(e.target.value)}
              placeholder="Enter new Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="What is your favourite Sport"
              required
            />
          </div>
          <button type="submit" className="btn btn-dark" style={{ width: "100%" }}>
            Reset
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword