import React from "react";
import "./loginaccount.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import {env}  from './config'

const Loginaccount = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues : {
      username : "",
      email : "",
      password : ""
    },
    validate : (values) => {
      let errors = {}
      if(values.username === ""){
        errors.username = "Please enter a username"
      }
      if (values.email === "")  {
        errors.email = "Please enter a email"        
      }
      if (values.password === "") {
        errors.password = "Please enter a password"
      }
      return errors
    },
    onSubmit : async (values) => {
      let loginaccount = await axios.post(`${env.api}/createAccount`,values)
      alert('New Login Account created');
      navigate('/')
    }
  })
  return (
   <form className="container-1" onSubmit={formik.handleSubmit}>
        <div className="window">
          <div className="overlay"></div>
          <div className="content">
            <div className="welcome">Hello There!</div>
            <div className="subtitle">
              Before using our services you need to create an account.
            </div>
            <div className="input-fields">
              <input
                type="text"
                id={`${formik.errors.username ? `input-error`:``}`}
                placeholder="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                className="input-line full-width"
                name="username"
              ></input>
              <input
                type="email"
                id={`${formik.errors.email ? `input-error`:``}`}
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="input-line full-width"
                name="email"
              ></input>
              <input
                type="password"
                id={`${formik.errors.password ? `input-error`:``}`}
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className="input-line full-width"
                name="password"
              ></input>
            </div>
            <div className="spacing">
              or continue with <Link className="highlight" to="/">Login</Link>
            </div>
            <div>
              <button className="ghost-round full-width" type={"submit"} disabled={!formik.isValid}>Create Account</button>
            </div>
          </div>
        </div>
      </form>
    );
};

export default Loginaccount;
