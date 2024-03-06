import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";
import axios from "axios";
import { useAuth } from "../../contextApi/auth";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/auth/admin-auth`,
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
      } catch (error) {
        console.error("Error checking admin authentication:", error);
        setOk(false); // Set ok to false if there's an error
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
}
