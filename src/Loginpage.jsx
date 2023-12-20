import React, { useState } from "react";
import "./loginpage.css";
import { useFormik } from "formik";
import axios from "axios";
import { env } from "./config";
import { Link, useNavigate } from "react-router-dom";

const Loginpage = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      let errors = {};
      if (values.email === "") {
        errors.email = "Please enter a valid email";
      }
      if (values.password === "") {
        errors.password = "Please enter a valid password";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const loginData = await axios.post(`${env.api}/login`, values);
        if (loginData.status === 200) {
          navigate("/mainPage");
          window.localStorage.setItem("app-token", loginData.data);
          setLoading(false);
        } else {
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    },
  });
  return (
    <div className="loginpage">
      <div className="loginbody">
        <div className="form form-login">
          {isLoading ? (
            <button class="btn btn-primary" type="button" disabled>
              <span
                class="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
              <span role="status">Loading...</span>
            </button>
          ) : (
            <form onSubmit={formik.handleSubmit}>
              <div className="form-header">
                <img
                  className="logo"
                  src="https://media.licdn.com/dms/image/C4D0BAQH746NGxDEPsQ/company-logo_200_200/0/1631340704531?e=2147483647&v=beta&t=Wx_y-mCmh_KgZph4nOldeYP4EYPGSgig-sPZs9NnmNs"
                  alt="Reon Logo"
                />
                <h3 className="text-white">Reon Technologies</h3>
              </div>
              <div className="form-body">
                <div className="form-group">
                  <input
                    type="email"
                    className="input-slideInRight"
                    id={`${formik.errors.email ? `input-error` : ``}`}
                    placeholder="E-mail"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    name="email"
                  />
                  <span style={{ color: "red" }}>{formik.errors.email}</span>
                  <label for="email" className="label-slideInRight">
                    E-mail
                  </label>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="input-slideInRight"
                    id={`${formik.errors.password ? `input-error` : ``}`}
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    name="password"
                  />
                  <label for="senha" className="label-slideInRight">
                    Password
                  </label>
                  <span style={{ color: "red" }}>{formik.errors.password}</span>
                </div>
                <div className="spacing">
                  or continue with{" "}
                  <Link className="highlight" to="/createLoginAccount">
                    Create Account
                  </Link>
                </div>
              </div>
              <div className="form-footer">
                <input type="submit" value="Login" />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
