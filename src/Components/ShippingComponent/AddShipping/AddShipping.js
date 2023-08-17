import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../../BaseUrl/BaseUrl";
import "./AddShipping.css";
import { useDispatch } from "react-redux";
import { addShippingAddress } from "./../../../Redux/Actions/ShippingAddressAction";
import { useSelector } from "react-redux";
import { getDeliveryCharge } from "../../../Redux/Actions/DeliveryChargeAction";
import MetaData from "../../../Pages/Layout/MetaData";

const AddShipping = () => {
  const token = localStorage.getItem("token");
  const [districtDataOptions, setDistrictDataOptions] = useState([]);
  const [thanaDataOptions, setThanaDataOptions] = useState([]);
  const [areaDataOptions, setAreaDataOptions] = useState([]);
  const [districtId, setDistrictId] = useState(null);
  const [thanaId, setThanaId] = useState(null);
  const [areaId, setAreaId] = useState(null);
  const [address, setAddress] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingAddressInfo } = useSelector((state) => state.shippingInfo);
  const { user } = useSelector((state) => state.user);


  useEffect(() => {
    axios
      .get(baseUrl + "/location/districts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setDistrictDataOptions(res.data.data);
      });
  }, [token]);


  const handleDistrictChange = (e) => {
    e.preventDefault();
    const districtId = e.target.value;
    setDistrictId(e.target.value);
    axios
      .get(baseUrl + `/location/thanas/${districtId}`)
      .then((res) => {
        
        setThanaDataOptions(res.data.data)
      });
  };


  const handleThanaChange = (e) => {
    e.preventDefault();
    const thanaId = e.target.value;
    setThanaId(e.target.value);
    axios
      .get(baseUrl + `/location/areas/${thanaId}`)
      .then((res) => setAreaDataOptions(res.data.data));
  };


  const handleAreaChange = (e) => {
    const areaId  = e.target.value;
    setAreaId(areaId)
  }
  const handleAddressChange = (e) => {
    const address  = e.target.value;
    setAddress(address)
  }


  const submitFailedBtn = () => {
    document.querySelector(".submitFailedAlert").innerHTML = "Please Select District, Thana and Area."
  }

  if(areaId) {
    document.querySelector(".submitFailedAlert").innerHTML = ""
  }

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {

    const district_id = districtId;
    const upazila_id = thanaId;

    const newData = {
      ...data, 
      contact_person_name : data.contact_person_name ? data.contact_person_name : user?.name, 
      phone: data.phone? data.phone : user?.phone, 
      optional_phone: data.optional_phone? data.optional_phone : user.optional_phone,
      district_id, 
      upazila_id 
    };
  
    console.log(newData)
    
    if (shippingAddressInfo?.status === "success") {
      navigate("/shipping-address");
    }  
     
    dispatch(addShippingAddress(newData));
    dispatch(getDeliveryCharge(district_id));
    
  };

  const scrollTop = () => {
    //onclick placeorder go to top of the page
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <>
      <MetaData title="Add-New-Delivery-Address - BPPShop" />
      <div className="shipping_Add_container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="shipping_Add_content">
            <div className="shipping_Add_header">Add New Delivery Address</div>
          </div>
          <hr className="shipping_Add_line" />

          <div className="shipping_address_input_container">
            <div className="form-group">
              <span>Contact person name</span>
              <input
                // {...register("contact_person_name", { required: true })}
                {...register("contact_person_name")}
                name="contact_person_name"
                className="shipping_address_input"
                type="text"
                placeholder="Enter Your Name"
                defaultValue={user?.name}
              />
            </div>
            <div className="form-group">
              <span>Phone</span>
              <input
                // {...register("phone", { required: true })}
                {...register("phone")}
                name="phone"
                className="shipping_address_input"
                type="text"
                placeholder="Enter Your Phone Number"
                defaultValue={user?.phone}
              />
            </div>
            <div className="form-group">
                  <span>Optional Phone</span>
                  <input
                    {...register("optional_phone")}
                    name="optional_phone"
                    className="shipping_address_input"
                    type="text"
                    placeholder="Enter Optional Number"
                    defaultValue={user?.optional_phone}
                  />
                </div>
            <div className="form-group">
              <span>District/City</span>
              <select
                {...register("district_id", { required: true })}
                onChange={handleDistrictChange}
                required
                name="district_id"
                className="shipping_address_input"
                aria-label="Default select example"
              >
                <option value={null} selected>
                  Select District/City------
                </option>
                {districtDataOptions?.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <span>Upazila/Thana</span>
              <select
                {...register("upazila_id", { required: true })}
                onChange={handleThanaChange}
                required
                name="upazila_id"
                className="shipping_address_input"
                aria-label="Default select example"
              >
                <option value={null} selected>
                  Select Upazila/Thana------
                </option>
                {thanaDataOptions.map((thana) => (
                  <option key={thana.id} value={thana.id}>
                    {thana.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <span>Area</span>
              <select
                {...register("area_id", { required: true })}
                onChange={handleAreaChange}
                name="area_id"
                required
                className=" shipping_address_input"
                aria-label="Default select example"
              >
                <option selected>Select Area------</option>
                {areaDataOptions.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.name}
                  </option>
                ))}
              </select>
            </div>

          </div>
            <div className="form-group mt-3">
              <span>Address</span>
              <input
                {...register("address", { required: true })}
                onChange={handleAddressChange}
                name="address"
                className="shipping_address_input"
                type="text"
                placeholder="House no. / Building /Street /Area"
              />
            </div>
          <p className="submitFailedAlert text-danger mt-2"></p>
          <div className="shipping_add_close_btn">
            <div>
              <Link to="/choose-shipping-address">
                <input
                  className="shipping_close_btn"
                  type="button"
                  value="Close"
                  onClick={scrollTop}
                />
              </Link>
            </div>
            
            <div>
              {address == null || areaId == null ? <input onClick={submitFailedBtn} className="submitFailedBtn" value="Save" /> : <input onClick={scrollTop} className="shipping_save_btn" type="submit" value="Save" />}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddShipping;
