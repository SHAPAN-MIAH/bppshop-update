import axios from "axios";
import React from "react";
import "./ProfileHome.css";
import { baseUrl } from "../../../BaseUrl/BaseUrl";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ProfileHome = () => {
  const { user } = useSelector((state) => state.user);
  // const token = localStorage.getItem("token");

  // const { register, handleSubmit } = useForm();
  // const onSubmit = (data) => {
  //   axios
  //     .post(baseUrl + "/customer/update-profile", data, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((res) => {
  //       if (res?.data?.status == "success") {
  //         toast.success(`Profile Update Successfully.`, {
  //           duration: 3000,
  //           style: {
  //             width: "100%",
  //             height: "80px",
  //             padding: "0px 20px",
  //           },
  //         });

  //         const profileInfoContainer = document.querySelector(
  //           ".profile_info_container"
  //         );
  //         const profileUpdateContainer = document.querySelector(
  //           ".profile_update_container"
  //         );
  //         profileInfoContainer.style.display = "block";
  //         profileUpdateContainer.style.display = "none";
  //       }
  //     });
  // };

  // const profileUpdateOpenHandler = () => {
  //   const profileInfoContainer = document.querySelector(
  //     ".profile_info_container"
  //   );
  //   const profileUpdateContainer = document.querySelector(
  //     ".profile_update_container"
  //   );
  //   profileInfoContainer.style.display = "none";
  //   profileUpdateContainer.style.display = "block";
  // };
  
  return (
    <>
      <div className="profile_right_content">
        <div className="profile_info_container">
          <div className="d-flex justify-content-between">
            <h4 className="profile_heading"> Profile Info </h4>
            <Link to="/profile/update-profile">
            <button className="profileUpdateOpenBtn" >
              Edit Profile <i class="bi bi-pencil-square"></i>
            </button>
            </Link>
          </div>

          <br />
          <div>
            <h5><strong>Name: </strong> {user?.name} </h5>
            
            <p><strong>Email: </strong> {user?.email}</p>
            <p><strong>Phone: </strong> {user?.phone}</p>
            <p><strong>Optional Phone: </strong> {user?.optional_phone}</p>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default ProfileHome;
