import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../../BaseUrl/BaseUrl";
import MetaData from "../../../Pages/Layout/MetaData";
import { toast } from "react-hot-toast";
import { setDefaultShippingAddress } from "../../../Redux/Actions/ShippingAddressAction";
import { useDispatch } from "react-redux";
import { getDeliveryCharge } from "../../../Redux/Actions/DeliveryChargeAction";

const EditShipping = () => {
  const token = localStorage.getItem("token");
  const [districtDataOptions, setDistrictDataOptions] = useState([]);
  const [thanaDataOptions, setThanaDataOptions] = useState([]);
  const [areaDataOptions, setAreaDataOptions] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [thanaId, setThanaId] = useState("");
  const [areaId, setAreaId] = useState("");
  const { editId } = useParams();
  const [editAddress, setEditAddress] = useState([]);
  const dispatch = useDispatch();

  //for view edit values
  useEffect(() => {
    axios
      .get(baseUrl + `/shipping-address/edit-address?id=${editId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setEditAddress(res?.data?.address);
        setDistrictId(res?.data?.address?.district_id);
        setThanaId(res?.data?.address?.upazila_id);
        setAreaId(res?.data?.address?.area_id);
      });
  }, [editId, token]);

  // get all distric
  useEffect(() => {
    axios
      .get(baseUrl + "/location/districts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setDistrictDataOptions(res.data.data);
      });
  }, [token]);

  // distric thana area selections
  const handleDistrictChange = (e) => {
    e.preventDefault();
    const districtId = e.target.value;
    if (e.target.value) {
      setThanaId("");
      setAreaId("");
    }

    setDistrictId(e.target.value);

    axios
      .get(baseUrl + `/location/thanas/${districtId}`)
      .then((res) => setThanaDataOptions(res.data.data));
  };
  const handleThanaChange = (e) => {
    e.preventDefault();
    const thanaId = e.target.value;
    setThanaId(e.target.value);
    setAreaId("");
    axios
      .get(baseUrl + `/location/areas/${thanaId}`)
      .then((res) => setAreaDataOptions(res.data.data));
  };
  const handleAreaChange = (e) => {
    e.preventDefault();
    setAreaId(e.target.value);
  };

  //update address and delevary charge set
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const district_id = districtId;
    const upazila_id = thanaId;
    const area_id = areaId;
    const id = editId;
    const setDefaultId = parseInt(editId);
    const addressId = {
      address_id: setDefaultId,
    };

    const newData = { 
      ...data, 
      contact_person_name : data.contact_person_name ? data.contact_person_name : editAddress?.name, 
      phone: data.phone? data.phone : editAddress?.phone, 
      optional_phone: data.optional_phone? data.optional_phone : editAddress.optional_phone,
      address: data.address? data.address : editAddress.address,
      district_id, 
      upazila_id, 
      area_id, 
      id 
    };

    axios
      .post(baseUrl + `/shipping-address/update-address`, newData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res?.data?.status === "success") {
          dispatch(setDefaultShippingAddress(addressId));
          dispatch(getDeliveryCharge(district_id));
          navigate("/shipping-address");

          // toaster
          toast.success(res?.data?.message, {
            duration: 5000,
            style: {
              width: "100%",
              height: "80px",
              padding: "0px 20px",
              background: "#86bc19",
              color: "#fff",
            },
          });
        } else {
          document.getElementById("errorMsg").innerText = res?.data?.message;
        }
      });
  };

  const handleNavigateToShippingAddressList = () => {
    navigate("/shipping-address");
    window.location.reload(true);
    
  };

  const scrollTop = () => {
    //onclick placeorder go to top of the page
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <>
      <MetaData title="Edit-New-Delivery-Address - BPPShop" />
      <div className="shipping_Add_container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="shipping_Add_content">
            <div className="shipping_Add_header">Update Delevery Address</div>
          </div>
          <hr className="shipping_Add_line" />

          <div className="shipping_address_input_container">
            <div className="form-group">
              <span>Contact person name</span>
              <input
                {...register("contact_person_name")}
                name="contact_person_name"
                className="shipping_address_input"
                type="text"
                defaultValue={editAddress?.contact_person_name}
              />
            </div>
            <div className="form-group">
              <span>Phone</span>
              <input
                {...register("phone")}
                name="phone"
                className="shipping_address_input"
                type="text"
                defaultValue={editAddress?.phone}
              />
            </div>
            <div className="form-group">
                  <span>Optional Phone</span>
                  <input
                    {...register("optional_phone")}
                    name="optional_phone"
                    className="shipping_address_input"
                    type="text"
                    defaultValue={editAddress?.optional_phone}
                  />
                </div>
            <div className="form-group">
              <span>District/City</span>
              <select
                {...register("district_id")}
                onChange={handleDistrictChange}
                name="district_id"
                className="shipping_address_input"
                aria-label="Default select example"
              >
                <option value="" selected>
                  {districtId
                    ? editAddress.city
                    : "------Select District/City------"}
                </option>
                {districtDataOptions?.map((district) => (
                  <option key={district?.id} value={district?.id}>
                    {district?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <span>Upazila/Thana</span>
              <select
                {...register("upazila_id")}
                onChange={handleThanaChange}
                name="upazila_id"
                className="shipping_address_input"
                aria-label="Default select example"
              >
                <option value="" selected>
                  {thanaId
                    ? editAddress.thana
                    : "------Select Upazila/Thana------"}
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
                {...register("area_id")}
                onChange={handleAreaChange}
                name="area_id"
                className=" shipping_address_input"
                aria-label="Default select example"
              >
                <option value="" selected>
                  {areaId ? editAddress.zip : "------Select Area------ "}
                </option>
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
                {...register("address")}
                name="address"
                className="shipping_address_input"
                type="text"
                defaultValue={editAddress?.address}
              />
            </div>
          <div>
            <i id="errorMsg" className="text-danger"></i>
          </div>

          <div className="shipping_add_close_btn">
            <div>
              {/* <Link to="/shipping-address"> */}
                <input
                  className="shipping_close_btn"
                  type="button"
                  value="Close"
                  onClick={handleNavigateToShippingAddressList}
                />
              {/* </Link> */}
            </div>
            <div>
              <input
                className="shipping_save_btn"
                type="submit"
                value="Update"
                onClick={scrollTop}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditShipping;
