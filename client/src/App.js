import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/User/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./components/Routes/Admin";

function App() {
  return (
    <>
      <Routes>
         <Route path="/" element={<HomePage/>}/>
         <Route path="/dashboard" element={<PrivateRoute/>}>
            <Route path="user" element={<Dashboard/>}/>
         </Route>
         <Route path="/dashboard" element={<AdminRoute/>}>
            <Route path="admin" element={<AdminDashboard/>}/>
         </Route>
         <Route path="/about" element={<About/>}/>
         <Route path="/contact" element={<Contact/>}/>
         <Route path="/policy" element={<PrivacyPolicy/>}/>
         <Route path="/register" element={<Register/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/forgot-password" element={<ForgotPassword/>}/>
         <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
