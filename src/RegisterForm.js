import { useFormik } from "formik";
import React, {useState} from 'react';
import axios from 'axios';
import './RegistrationForm.css';
// import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import { useHistory } from "react-router-dom";
const validate = values => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = 'Required';
    } else if (values.firstName.length > 15) {
      errors.firstName = 'Must be 15 characters or less';
    }
  
    if (!values.lastName) {
      errors.lastName = 'Required';
    } else if (values.lastName.length > 20) {
      errors.lastName = 'Must be 20 characters or less';
    }
    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length > 20) {
      errors.password = 'Must be 20 characters or less';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Required';
    } else if (values.confirmPassword.length > 20) {
      errors.confirmPassword = 'Must be 20 characters or less';
    }
    if (values.password !== values.confirmPassword) {
  
      errors.confirmPassword='Must enter same password';
  
    } 
      
    
  
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
  
    return errors;
  };
  
  
  const RegisterForm = () => {
    const history= useHistory();
    const redirectToHome = () => {
        //updateTitle('Home')
        history.push('/Home');
      };
    const sendDetailsToServer = (values) => {
        const payload={
            "email":values.email,
            "password":values.password,
        }
        axios.post("", payload)
            .then(function (response) {
                if(response.status === 200){
                   console.log("login successful") 
            //'successMessage' : 'Registration successful. Redirecting to home page..'
            
                redirectToHome();
                
                    // values.showError(null)
            } else{
                    values.showError("Some error ocurred");
                }
            })
            .catch(function (error) {
                console.log(error);
            });   
    
}

    // const [values, setValues] = React.useState({});
   
    // const handleChange = event => {
    //   setValues(prevValues => ({
    //     ...prevValues,
    //     // we use the name to tell Formik which key of `values` to update
    //     [event.target.name]: event.target.value
    //   });
    // }
    const formik = useFormik({
      initialValues: {
        firstName:"",
        lastName:"",
        password:"",
        confirmPassword:"",
        
        
        
        email: "" },
        validate,
      onSubmit: values => {
        sendDetailsToServer(values);
        alert(JSON.stringify(values, null, 2));
      }
    });
    
    
    
    return (
        <div className="register">
      <form onSubmit={formik.handleSubmit}  className="form">
         <label htmlFor="firstName">First Name</label>
         <input
           id="firstName"
           name="firstName"
           type="text"
           className="field"
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           value={formik.values.firstName}
         />
          {formik.touched.firstName && formik.errors.firstName ? (<div>{formik.errors.firstName}</div>) : null}
   
         <label htmlFor="lastName">Last Name</label>
         <input
           id="lastName"
           name="lastName"
           type="text"
           className="field"
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           value={formik.values.lastName}
         />
         {formik.errors.lastName && formik.touched.lastName? (<div>{formik.errors.lastName}</div>) : null}
  
         <label htmlFor="password">Password</label>
         <input
           id="password"
           name="password"
           type="password"
           className="field"
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           value={formik.values.password}
         />
         {formik.errors.password && formik.touched.password ? (<div>{formik.errors.password}</div>): null}
         <label htmlFor="password">Confirm Password</label>
         <input
           id="confirmPassword"
           name="confirmPassword"
           type="Password"
           className="field"
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           value={formik.values.confirmPassword}
         />
         {formik.touched.confirmPassword && formik.errors.confirmPassword ? (<div>{formik.errors.confirmPassword}</div>) : null}
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          className="field"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (<div>{formik.errors.email}</div>) : null}
        <div className="btn">
        <button type="submit" className= "register_btn">Sign Up</button>
        </div >
        <p className="forgot-password text-right">Already Registered <Link to='/'>sign in?</Link></p>
      </form>
      </div>
    );
  };

  
  


    

export default RegisterForm;