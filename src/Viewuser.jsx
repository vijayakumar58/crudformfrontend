import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {env} from './config';

const Viewuser = () => {
  const params = useParams()
  const [userData, setUserData] = useState({});
  const [isLoading, setLoading] = useState(false);

  useEffect(()=> {
    loadUser()
  },[]);
  let loadUser = async () => {
    try {
      setLoading(true);
      let user = await axios.get(`${env.api}/viewuser/${params.id}`,{
        headers : {
          'authorization' : window.localStorage.getItem("app-token"),
        }
      })
      setUserData(user.data);
      console.log(user.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }
  console.log(loadUser);
  return (
    <div className="card text-left text-opacity ml-4 mr-4" style={{color :"black" , fontSize : "40px"}}>
        <div>
        <h2 className="card-header d-flex justify-content-center">Personal Information</h2>
        </div>
      <div className="card-header d-flex justify-content-center">
        User Id : {userData._id}
      </div>
      {
        isLoading ? (
          <button
            className="btn btn-warning"
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
        ) :(
          <div className="container-fluid">
        <div className="row">
        <div className=" col-9 card-body ml-5 mr-5 bg-warning" style={{fontSize : "20px"}}>
        <h5 className="card-title">Name : {userData.name}</h5>
        <h5 className="card-title">Email : {userData.email}</h5>
        <h5 className="card-title">Degree : {userData.degree}</h5>
        <h5 className="card-title">Home-Address : {userData.homeaddress}</h5>
        <h5 className="card-title">Mobile-No : {userData.mobile}</h5>
      </div>
      <div className="col-3 ">
          {/* <img src={userData.image ? require(`./images/${userData.image}`) : null} alt="A beautiful picture of a landscape" style={{height:"250px", width:"340px",padding:""}} /> */}
          <img src={userData.image ? `${env.api}/src/images/${userData.image}` : null} alt="User Avatar" style={{ height: "250px", width: "340px", padding: "" }} />
        </div>
        </div>
      </div>
        )
      }
      
    </div>
  );
};

export default Viewuser;
