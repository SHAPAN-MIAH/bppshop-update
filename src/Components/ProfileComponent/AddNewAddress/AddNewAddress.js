import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../../BaseUrl/BaseUrl";
import { addShippingAddress } from "./../../../Redux/Actions/ShippingAddressAction";
import { useForm } from "react-hook-form";
import MetaData from "../../../Pages/Layout/MetaData";

const AddNewAddress = () => {
  const token = localStorage.getItem("token");
  const [districtDataOptions, setDistrictDataOptions] = useState([]);
  const [thanaDataOptions, setThanaDataOptions] = useState([]);
  const [areaDataOptions, setAreaDataOptions] = useState([]);
  const [districtId, setDistrictId] = useState(null);
  const [thanaId, setThanaId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingAddressInfo } = useSelector((state) => state.shippingInfo);

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
      .then((res) => setThanaDataOptions(res.data.data));
  };

  const handleThanaChange = (e) => {
    e.preventDefault();
    const thanaId = e.target.value;
    setThanaId(e.target.value);
    axios
      .get(baseUrl + `/location/areas/${thanaId}`)
      .then((res) => setAreaDataOptions(res.data.data));
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const district_id = districtId;
    const upazila_id = thanaId;
    const newData = { ...data, district_id, upazila_id };

    dispatch(addShippingAddress(newData));

    if (shippingAddressInfo?.status === "success") {
      navigate("/profile/account-address");
    }
  };
  return (
    <>
      <MetaData title="Add Address - BPPShop" />
      <div>
        <form>
          <div className="shipping_Add_container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="shipping_Add_content">
                <div className="shipping_Add_header">Add New Address</div>
              </div>
              <hr className="shipping_Add_line" />

              <div className="shipping_address_input_container">
                <div className="form-group">
                  <span>Contact person name *</span>
                  <input
                    {...register("contact_person_name", { required: true })}
                    name="contact_person_name"
                    className="shipping_address_input"
                    type="text"
                    placeholder="Enter Your Name"
                  />
                </div>
                <div className="form-group">
                  <span>Phone *</span>
                  <input
                    {...register("phone", { required: true })}
                    name="phone"
                    className="shipping_address_input"
                    type="text"
                    placeholder="Enter Your Phone Number"
                  />
                </div>
                <div className="form-group">
                  <span>Optional Phone *</span>
                  <input
                    {...register("optional_phone", { required: true })}
                    name="optional_phone"
                    className="shipping_address_input"
                    type="text"
                    placeholder="Enter Your Optional Phone Number"
                  />
                </div>
                <div className="form-group">
                  <span>District/City*</span>
                  <select
                    // {...register("district_id", { required: true })}
                    onChange={handleDistrictChange}
                    required
                    name="district_id"
                    className="shipping_address_input"
                    aria-label="Default select example"
                  >
                    <option value={null} selected>
                      ------Select District/City------
                    </option>
                    {districtDataOptions?.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <span>Upazila/Thana*</span>
                  <select
                    // {...register("upazila_id", { required: true })}
                    onChange={handleThanaChange}
                    required
                    name="upazila_id"
                    className="shipping_address_input"
                    aria-label="Default select example"
                  >
                    <option value={null} selected>
                      ------Select Upazila/Thana------
                    </option>
                    {thanaDataOptions.map((thana) => (
                      <option key={thana.id} value={thana.id}>
                        {thana.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <span>Area*</span>
                  <select
                    {...register("area_id", { required: true })}
                    name="area_id"
                    className=" shipping_address_input"
                    aria-label="Default select example"
                  >
                    <option selected>------Select Area------</option>
                    {areaDataOptions.map((area) => (
                      <option key={area.id} value={area.id}>
                        {area.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <span>Address *</span>
                  <input
                    {...register("address", { required: true })}
                    name="address"
                    className="shipping_address_input"
                    type="text"
                    placeholder="House no. / Building /Street /Area"
                  />
                </div>
              </div>

              <div className="shipping_add_close_btn">
                <div>
                  <Link to="/profile/account-address">
                    <input
                      className="shipping_close_btn"
                      type="button"
                      value="close"
                    />
                  </Link>
                </div>
                <div>
                  <input
                    className="shipping_save_btn"
                    type="submit"
                    value="save"
                  />
                </div>
              </div>
            </form>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewAddress;
