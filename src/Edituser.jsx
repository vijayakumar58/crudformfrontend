import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { env } from "./config";

const Edituser = () => {
  const params = useParams();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      degree: "",
      homeaddress: "",
      mobile: "",
      image: "",
    },
    validate: (values) => {
      let errors = {};
      if (values.name === "") {
        errors.name = "Please enter a name";
      }
      if (values.email === "") {
        errors.email = "Please enter a email";
      }
      if (values.degree === "") {
        errors.degree = "Please enter a degree";
      }
      if (values.homeaddress === "") {
        errors.homeaddress = "Please enter";
      }
      if (values.mobile === "") {
        errors.mobile = "please enter a mobile number";
      }
      if (values.image === "") {
        errors.image = "Please upload image";
      }
      return errors;
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("degree", values.degree);
      formData.append("homeaddress", values.homeaddress);
      formData.append("mobile", values.mobile);
      formData.append("image", values.image);

      let edituserUser = await axios.put(
        `${env.api}/editUser/${params.id}`,
        formData,
        {
          headers: {
            authorization: window.localStorage.getItem("app-token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("User Update successfully");
      navigate("/mainPage");
    },
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      let edituser = await axios.get(`${env.api}/viewUser/${params.id}`, {
        headers: {
          authorization: window.localStorage.getItem("app-token"),
        },
      });
      formik.setValues({
        name: edituser.data.name,
        email: edituser.data.email,
        degree: edituser.data.degree,
        homeaddress: edituser.data.homeaddress,
        mobile: edituser.data.mobile,
        image: edituser.data.image,
      });
    } catch (error) {}
  };
  return (
    <div id="createuser">
      <div id="formContainer">
        <form className="user" id="form" onSubmit={formik.handleSubmit}>
          <fieldset>
            <h1>User Updation Form</h1>
            <div className="form-group row">
              <div className="col-sm-6 mb-3 mb-sm-0">
                <label style={{ color: "black" }}>Name</label>
                <input
                  type="text"
                  className="form-control form-control-user"
                  id={`${formik.errors.name ? `input-error` : ``}`}
                  placeholder="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  name="name"
                />
                <span style={{ color: "red" }}>{formik.errors.name}</span>
              </div>
              <div className="col-sm-6">
                <lable style={{ color: "black" }}>Email</lable>
                <input
                  type="text"
                  className="form-control form-control-user"
                  id={`${formik.errors.email ? `input-error` : ``}`}
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  name="email"
                />
                <span style={{ color: "red" }}>{formik.errors.email}</span>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-6 mb-3 mb-sm-0">
                <lable style={{ color: "black" }}>Degree</lable>
                <input
                  type="text"
                  className="form-control form-control-user"
                  id={`${formik.errors.degree ? `input-error` : ``}`}
                  placeholder="Degree"
                  value={formik.values.degree}
                  onChange={formik.handleChange}
                  name="degree"
                />
                <span style={{ color: "red" }}>{formik.errors.degree}</span>
              </div>
              <div className="col-sm-6">
                <lable style={{ color: "black" }}>Home Address</lable>
                <input
                  type="text"
                  className="form-control form-control-user"
                  id={`${formik.errors.homeaddress ? `input-error` : ``}`}
                  placeholder="Home Address"
                  value={formik.values.homeaddress}
                  onChange={formik.handleChange}
                  name="homeaddress"
                />
                <span style={{ color: "red" }}>
                  {formik.errors.homeaddress}
                </span>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-6 mb-3 mb-sm-0">
                <lable style={{ color: "black" }}>Mobile No</lable>
                <input
                  type="number"
                  className="form-control form-control-user"
                  id={`${formik.errors.mobile ? `input-error` : ``}`}
                  placeholder="Mobile No"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  name="mobile"
                />
                <span style={{ color: "red" }}>{formik.errors.mobile}</span>
              </div>
              <div className="col-sm-6">
                <lable style={{ color: "black" }}>Image</lable>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control form-control-user"
                  id={`${formik.errors.image ? `input-error` : ``}`}
                  placeholder="Salarey"
                  // value={formik.values.image}
                  onChange={(e) => formik.setFieldValue("image", e.target.files[0])}
                  name="image"
                />
                <span style={{ color: "red" }}>{formik.errors.image}</span>
              </div>
            </div>
            <input
              className="btn btn-user btn-block"
              id="submit"
              type={"submit"}
              value="Register Account"
              disabled={!formik.isValid}
            />
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Edituser;
