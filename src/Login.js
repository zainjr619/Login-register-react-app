import { useFormik } from "formik";
import React, { useState } from "react";
import axios from "axios";
//import './RegistrationForm.css';
import "./Login.css";
// import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Messi from "./video/Messi.mp4";
import { useDispatch } from "react-redux";
const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  }
  if (!values.password) {
    errors.password = "Required";
  }
};
//   const acessToken='';
//   axios.interceptors.request.use(
//       config=>{
//           config.headers.authorization = {acessToken};
//           return config;
//       },
//       error=>{
//           return Promise.reject(error);
//       }

//   )

const Login = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      CheckinLogin(values);
      JSON.stringify(values, null, 2);
    },
  });
  const history = useHistory();
  if (localStorage.getItem("token")) {
    history.push("/home");
  }
  const redirectToHome = () => {
    //updateTitle('Home')
    history.push("/Home");
  };

  const CheckinLogin = (values) => {
    var email, pass, email1, pass1;
    email1 = values.email;
    pass1 = values.password;

    console.log("started");
    var id = 1;
    var jwt =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        console.log("inside first then");

        return response;
      })
      .then((data) => {
        console.log("2nd then data");
        email = data.data.email;
        pass = data.data.password;

        if (email1 === email && "12345" === pass1) {
          dispatch({
            user: email,
            type: "SignIn",
          });
          localStorage.setItem("token", jwt);
          redirectToHome();
        } else {
          alert("WRONG CREDENTIALS");
        }
      });
  };
  return (
    // <video autoplay muted loop id="myVideo">
    // <source src="rain.mp4" type="video/mp4">
    // Your browser does not support HTML5 video.
    // </video>
    <div className="bg">
      <video autoPlay loop muted className="bg_video">
        <source src={Messi} type="video/mp4" />
      </video>
      <div className="login">
        <form onSubmit={formik.handleSubmit} className="form">
          <label htmlFor="email" className="label">
            Email Address
          </label>

          <input
            className="field"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="field"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <br></br>
          {formik.errors.password && formik.touched.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
          <div className="btn">
            <button type="submit" className="login_btn">
              Login
            </button>
          </div>
          <p className="forgot-password text-right">
            Not Registered <Link to="/RegisterForm">sign up?</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;
