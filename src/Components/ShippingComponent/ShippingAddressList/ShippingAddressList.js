import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ShippingAddressList.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadAllShippingAddress } from "../../../Redux/Actions/ShippingAddressAction";
import { setDefaultShippingAddress } from "./../../../Redux/Actions/ShippingAddressAction";
import { getDeliveryCharge } from "../../../Redux/Actions/DeliveryChargeAction";
import MetaData from "../../../Pages/Layout/MetaData";
import axios from "axios";
import { baseUrl } from "../../../BaseUrl/BaseUrl";
import { toast } from "react-hot-toast";

const ShippingAddressList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadAllShippingAddress());
  }, [dispatch]);

  const { allShippingAddressInfo } = useSelector(
    (state) => state?.allShippingInfo
  );

  const { shippingAddressInfo } = useSelector((state) => state?.shippingInfo);

  const handleSetDefaultAddress = (address_id) => {
    const addressId = {
      address_id: address_id,
    };

    dispatch(setDefaultShippingAddress(addressId));

    if (shippingAddressInfo?.status === "success") {
      navigate("/shipping-address");
    }
  };

  //address detele functionality
  const handleDeleteAddress = (shippingId, customerId) => {
    const token = localStorage.getItem("token");
    const deleteData = {
      customer_id: customerId,
      id: shippingId,
    };
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post(`${baseUrl}/shipping-address/delete-address`, deleteData, config)
      .then((res) => {
        if (res.status === 200) {
          dispatch(loadAllShippingAddress());
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
        }
      });
  };

  const handleNavigateToShippingDetails = () => {
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
      <MetaData title="Choose-Default-Delivery-Address - BPPShop" />
      <div>
        <div className="shipping_container">
          <button
            onClick={handleNavigateToShippingDetails}
            className="my-4 shadow-sm border-0 py-2 px-4 rounded-2"
          >
            <i className="bi bi-arrow-left-circle mr-2"></i> Back
          </button>
          <div className="shipping_content">
            <div className="shipping_header">
              {/* Choose Delivery Address or Add New Delivery Address. */}
              Choose Delivery Address.
            </div>
          </div>
          <hr className="shipping_line" />
          <div className="address_content">
            <div className="row">
              {allShippingAddressInfo &&
                allShippingAddressInfo?.data?.map((shippingAddInfo) => (
                  <div key={shippingAddInfo?.id} className="col-md-6">
                    <div className="shipping_address_box">
                      <div className="shipped_person">
                        <div>
                          <h6>
                            Delivery to : {shippingAddInfo?.contact_person_name}
                          </h6>
                        </div>
                        <div>
                          {shippingAddInfo?.is_billing === 1 ? (
                            <div className="default_btn">
                              <i className="bi bi-check-circle-fill"></i>
                            </div>
                          ) : (
                            <div
                              onClick={() =>
                                handleSetDefaultAddress(shippingAddInfo?.id)
                              }
                              className="set_default_btn"
                            >
                              <span
                                onClick={() =>
                                  dispatch(
                                    getDeliveryCharge(
                                      shippingAddInfo?.district_id
                                    )
                                  )
                                }
                              >
                                <i className="bi bi-check"></i> Choose
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="shiped_address mb-2">
                        <span className="home_text">home </span>{" "}
                        <span className="mx-1">
                          {shippingAddInfo?.phone} |{" "}{ shippingAddInfo?.city}, { shippingAddInfo?.thana}, { shippingAddInfo?.zip}, { shippingAddInfo?.address}{" "}
                        </span>
                      </div>
                        <span
                          onClick={() =>
                            handleDeleteAddress(
                              shippingAddInfo?.id,
                              shippingAddInfo?.customer_id
                            )
                          }
                          className="change_text"
                        >
                          <i className="bi bi-trash3-fill"></i> Delete
                        </span>
                    </div>
                  </div>
                ))}
            </div>

            <Link to="/add-shipping-address">
              <button onClick={scrollTop} className="add_more_address_btn mt-3">
                <i className="bi bi-plus"></i> Add New Delivery Address
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingAddressList;
