import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
   //Initializing context variable
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  //Get the user data from localstorage so that after refreshing the page also we can get the user info
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
         ...auth,
         user: parseData.user,
         token: parseData.token
      })
    }
    //eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

//Custom hook
const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };
