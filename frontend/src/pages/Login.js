import "font-awesome/css/font-awesome.min.css";
import { Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../hooks/useAuth";
import "./login.css";

import * as Yup from "yup";
// inital login credentials
const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
  // email: Yup.string()
  //   .email("Invalid Email address")
  //   .required("Email is required!"),
  // username: Yup.string()
  //   .email("Invalid Username")
  //   .required("Username is required!"),
});
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const apiUrl = process.env.REACT_APP_API_URL;
  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (e) {
      toast.error("An error occurred during login.");
      setLoading(false);
    }
  };
   return (
   <>
     <ToastContainer position="top-center" />
 
     <div className="register-page">
 
       {/* TOP BAR */}
       <div className="register-topbar">
         <div className="topbar-left">
           <span className="back-arrow">←</span>
           <span className="app-title">EdSofta Desktop</span>
         </div>
 
         <div className="auth-toggle">
           <button className="active">Sign Up</button>
           <button onClick={() => navigate("/login")}>Sign In</button>
         </div>
       </div>
 
       {/* MAIN CONTENT */}
       <div className="register-content">
 
         {/* LEFT TEXT */}
         <div className="register-left">
           <h1>Welcome Back</h1>
           <p>Sign in to your account below</p>
         </div>
 
         {/* RIGHT FORM */}
         <div className="register-right">
           <Formik
             initialValues={initialValues}
             validationSchema={validationSchema}
             onSubmit={handleFormSubmit}
           >
             {({
               values,
               errors,
               touched,
               handleChange,
               handleBlur,
               handleSubmit,
             }) => (
               <form onSubmit={handleSubmit} className="register-form">
 
        
 
          
 
                 <div className="form-group">
                   <label>Email</label>
                   <input
                     type="email"
                     name="email"
                     value={values.email}
                     onChange={handleChange}
                     onBlur={handleBlur}
                   />
                 </div>
 
              
 
                 <div className="form-group">
                   <label>Password</label>
                   <input
                     type={showPassword ? "text" : "password"}
                     name="password"
                     value={values.password}
                     onChange={handleChange}
                     onBlur={handleBlur}
                   />
                 </div>
 
               
                 <div className="submit-row">
                   <button type="submit" disabled={loading}>
                     {loading ? "Submitting..." : "Submit"}
                   </button>
                 </div>
 
               </form>
             )}
           </Formik>
         </div>
 
       </div>
     </div>
   </>
 );
};

export default Login;
