import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../../BaseUrl/BaseUrl';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    axios
      .post(baseUrl + "/customer/update-profile", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res?.data?.status == "success") {
          toast.success(`Profile Update Successfully.`, {
            duration: 3000,
            style: {
              width: "100%",
              height: "80px",
              padding: "0px 20px",
            },
          });

          navigate("/profile")
        }
      });
  };


  return (
    <div>
      <div className="profile_update_container">
          <h4 className="profile_heading"> Profile Update </h4>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  <label htmlFor="email">Email </label>
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
                  <input
                    {...register("optional_phone")}
                    type="text"
                    className="input_field"
                    name="phone"
                    defaultValue={user?.optional_phone}
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
    </div>
  );
};

export default UpdateProfile;