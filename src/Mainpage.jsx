import React, { useEffect, useState } from "react";
import "./mainpage.css";
import { env } from "./config";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Mainpage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);
  let loadData = async () => {
    setLoading(true);
    let users = await axios.get(
      `${env.api}/getAllUsers`, {
        headers : {
          'authorization' : window.localStorage.getItem("app-token")
      }
    });
    setUsers(users.data);
    setLoading(false);
  };

  let userDelete = async (id) => {
    try {
      let ask = window.confirm("Are you sure you want to delete this user?");
      if (ask) {
        await axios.delete(
          `${env.api}/deleteUser/${id}`, {
          headers: {
            'authorization': window.localStorage.getItem("app-token"),
          },
        });
      }
      loadData();
    } catch (error) {}
  };
  return (
    <div className="mainbody">
      <section>
        <h1>User Details</h1>
        <div className="d-flex justify-content-end">
          <Link
            to="/createUser"
            className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          >
            <i className="fas fa-download fa-sm text-white-50"></i> Create User
          </Link>
        </div>
        {isLoading ? 
          <button
            className="btn btn-primary"
            style={{ fontSize: "50px" }}
            type="button"
            disabled
          >
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </button>
         : (
          <div>
            <div className="tbl-header">
              <table >
                <thead>
                  <tr>
                    <th>SNo</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Degree</th>
                    <th>Home-Address</th>
                    <th>Mobile No</th>
                    <th>image</th>
                    <th>Action</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="tbl-content">
              <table cellpadding="0" cellspacing="0" border="0">
                <tbody>
                  {users.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.degree}</td>
                        <td>{user.homeaddress}</td>
                        <td>{user.mobile}</td>
                        <td>{user.image}</td>
                        <td>
                            <Link to={`/viewUser/${user._id}`} className='btn btn-sm btn-warning mr-2'><FontAwesomeIcon icon={faEye}></FontAwesomeIcon> </Link>
                            <Link  to={`/editUser/${user._id}`} className='btn btn-sm btn-primary mr-2'><FontAwesomeIcon icon={faPenSquare}></FontAwesomeIcon> </Link>
                            <button onClick={()=>{userDelete(user._id)}} className='btn btn-sm btn-danger mr-2'><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon> </button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Mainpage;
