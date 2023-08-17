import React from "react";
import "./Profile.css";
import { Link, Outlet } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import { useSelector } from "react-redux";
import avaterImg from "../../Assets/Images/default-avatar.jpg";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <MetaData title="Your Profile - BPPShop" />
      <div className="profile_container">
        <div className="row">
          <div className="col-md-3 col-sm-12">
            <div className="profile_left_container m-2">
              <div className="d-flex mb-2">
                <img width={30} src={avaterImg} alt="" />
                <div className="mx-2">
                  <h5>{user?.name}</h5>
                </div>
              </div>
              <hr />
              <Link to="/profile">
                <p className="sidebar_left">Profile Info</p>
              </Link>
              <Link to="/profile/orders">
                <p className="sidebar_left">My Orders List</p>
              </Link>
              {/* <div className="sidebar_left">
                <Link to="/profile/track-order"> Track your order</Link>
              </div> */}
              <Link to="/profile/account-address">
                <p className="sidebar_left">Previous Order Address</p>
              </Link>
            </div>
          </div>
          <div className="col-md-9 col-sm-12">
            <div className="profile_right_container m-2">
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
