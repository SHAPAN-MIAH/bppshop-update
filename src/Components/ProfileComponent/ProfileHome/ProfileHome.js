import axios from "axios";
import React from "react";
import "./ProfileHome.css";
import { baseUrl } from "../../../BaseUrl/BaseUrl";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const ProfileHome = () => {
  const { user } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    axios
      .post(baseUrl + "/customer/update-profile", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res?.data?.status === "success") {
          alert(res?.data?.message);
        }
      });
  };

  // console.log(user)
  return (
    <>
      <div className="profile_right_content">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <div className="profile_img_section">
            <div className="profile_img_box">
              <img
                className="profile_img"
                src="https://bppshop.com.bd/assets/front-end/img/image-place-holder.png"
                alt=""
                srcSet=""
              />
            </div>
            <div>
              <div className="profile_name">{userProfile?.name}</div>
              <div>
                <label htmlFor="files" className="change_profile_header">
                  Change your profile
                </label>
                <span className="change_profile_ratio">
                  ( * Image ratio should be 1:1 )
                </span>
                <input
                  className="hidden_input_file"
                  id="files"
                  name="image"
                  type="file"
                />
              </div>
            </div>
          </div> */}
          <h4 className="profile_heading"> Profile Info </h4>
          <div className="row my-3">
            <div className="col-md-6 col-sm-12 mb-3">
              <div className="form-group">
                <label htmlFor="name">Your name </label>
                <input
                  {...register("name")}
                  type="text"
                  className="input_field"
                  name="name"
                  defaultValue={user?.name}
                />
              </div>
            </div> 
            <div className="col-md-6 col-sm-12 mb-3">
              <div className="form-group">
                <label htmlFor="inputEmail4">Email </label>
                <input
                  {...register("email")}
                  type="email"
                  className="input_field"
                  name="email"
                  defaultValue={user?.email}
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-12 mb-3">
              <div className="form-group">
                <label htmlFor="phone">Phone </label>
                <small className="text-primary">
                  ( Country code is must Like for BD 880 )
                </small>
                <input
                  type="text"
                  className="input_field"
                  name="phone"
                  value={user?.phone}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-12 mb-3">
              <div className="form-group">
                <label htmlFor="phone">Optional Phone </label>
                {/* <small className="text-primary">
                  ( Country code is must Like for BD 880 )
                </small> */}
                <input
                  type="text"
                  className="input_field"
                  name="phone"
                  value={user?.optional_phone}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label htmlFor="si-password">New password</label>
                <input
                  {...register("password")}
                  className="input_field"
                  name="password"
                  type="password"
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-12 ">
              <div className="form-group">
                <label htmlFor="newPass">Confirm password </label>
                <input
                  {...register("con_password")}
                  className="input_field"
                  name="con_password"
                  type="password"
                />
              </div>
            </div>
          </div>
          <div className="my-1">
            <small className="text-danger">
              <i>
                If you don't want to change password please keep blank the
                password fields.
              </i>
            </small>
          </div>
          <div className="profile_form_btn_section">
            <input
              type="submit"
              className="profile_update_btn"
              value="Update"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileHome;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import "./ProfileHome.css";
// import { baseUrl} from "../../../BaseUrl/BaseUrl";
// import { useForm } from "react-hook-form";
// import ProfileHeader from "./../ProfileHeader/ProfileHeader";

// const ProfileHome = () => {
//   const [userProfile, setUserProfile] = useState([]);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     axios
//       .get(baseUrl + "/customer/profile", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         setUserProfile(res?.data?.data);
//       });
//   }, []);

//   const { register, handleSubmit } = useForm();
//   const onSubmit = (data) => {
//     axios
//       .post(baseUrl + "/customer/update-profile", data, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         if (res?.data?.status === "success") {
//           console.log(res?.data);
//           alert(res?.data?.message);
//         }
//       });
//   };
//   return (
//     <>
//       <ProfileHeader>Profile Info</ProfileHeader>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {/* <div className="profile_img_section">
//             <div className="profile_img_box">
//               <img
//                 className="profile_img"
//                 src="https://bppshop.com.bd/assets/front-end/img/image-place-holder.png"
//                 alt=""
//                 srcSet=""
//               />
//             </div>
//             <div>
//               <div className="profile_name">{userProfile?.name}</div>
//               <div>
//                 <label htmlFor="files" className="change_profile_header">
//                   Change your profile
//                 </label>
//                 <span className="change_profile_ratio">
//                   ( * Image ratio should be 1:1 )
//                 </span>
//                 <input
//                   className="hidden_input_file"
//                   id="files"
//                   name="image"
//                   type="file"
//                 />
//               </div>
//             </div>
//           </div> */}

//         <div className="form-group col-md-12 my-3">
//           <label htmlFor="name">Your name </label>
//           <input
//             {...register("name")}
//             type="text"
//             className="input_field"
//             name="name"
//             defaultValue={userProfile?.name}
//           />
//         </div>
//         <div className="row my-3">
//           <div className="col-md-6 col-sm-12">
//             <div className="form-group">
//               <label htmlFor="phone">Mobile </label>
//               <small className="text-primary">
//                 ( * Country code is must Like for BD 880 )
//               </small>
//               <input
//                 type="text"
//                 className="input_field"
//                 name="phone"
//                 value={userProfile?.phone}
//                 disabled
//               />
//             </div>
//           </div>
//           <div className="col-md-6 col-sm-12">
//             <div className="form-group">
//               <label htmlFor="inputEmail4">Email </label>
//               <input
//                 {...register("email")}
//                 type="email"
//                 className="input_field"
//                 name="email"
//                 defaultValue={userProfile?.email}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-md-6 col-sm-12">
//             <div className="form-group">
//               <label htmlFor="si-password">New password</label>
//               <input
//                 {...register("password")}
//                 className="input_field"
//                 name="password"
//                 type="password"
//               />
//             </div>
//           </div>
//           <div className="col-md-6 col-sm-12">
//             <div className="form-group">
//               <label htmlFor="newPass">Confirm password </label>
//               <input
//                 {...register("con_password")}
//                 className="input_field"
//                 name="con_password"
//                 type="password"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="my-1">
//           <small className="text-danger">
//             <i>
//               If you don't want to change password please keep blank the
//               password fields.
//             </i>
//           </small>
//         </div>
//         <div className="profile_form_btn_section">
//           <button className="profile_delete_btn">Delete</button>
//           <input type="submit" className="profile_update_btn" value="Update" />
//         </div>
//       </form>
//     </>
//   );
// };

// export default ProfileHome;
