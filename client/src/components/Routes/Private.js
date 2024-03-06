import { useState, useEffect } from "react";
import { useAuth } from "../../contextApi/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    //Verifying user token
    const authCheck = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/user-auth`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (result.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    //Now calling the authCheck function if token available
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
