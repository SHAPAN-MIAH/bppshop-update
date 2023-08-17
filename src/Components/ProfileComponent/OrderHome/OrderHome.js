import React from "react";
import "./OrderHome.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MetaData from "./../../../Pages/Layout/MetaData";
import axios from "axios";
import { baseUrl } from "../../../BaseUrl/BaseUrl";
import { toast } from "react-hot-toast";
import store from "../../../Redux/Store";
import { loadUserOrders } from "../../../Redux/Actions/UserOrderAction";
import { useEffect } from "react";

const OrderHome = () => {
  // const { userOrders } = useSelector((state) => state?.userOrders);
  // const { cancelOrdersResponse } = useSelector(
  //   (state) => state?.cancelOrdersResponse
  // );
  // const dispatch = useDispatch();

  // const handleOrderCancel = (id) => {
  //   dispatch(loadUserOrderCancelRequest(id));
  // };
  // useEffect(() => {
  //   store.dispatch(loadUserOrders());
  //   if (cancelOrdersResponse?.status === "success") {
  //     store.dispatch(loadUserOrders());
  //     toast.success(`${cancelOrdersResponse?.message}`, {
  //       duration: 5000,
  
  //       style: {
  //         width: "100%",
  //         height: "80px",
  //         padding: "0px 20px",
  //         background: "#86bc19",
  //         color: "#fff",
  //       },
  //     });
  //   }
  //   if (cancelOrdersResponse?.status === "failed") {
  //     toast.success(`${cancelOrdersResponse?.message}`, {
  //       duration: 5000,
  
  //       style: {
  //         width: "100%",
  //         height: "80px",
  //         padding: "0px 20px",
  //         background: "#86bc19",
  //         color: "#fff",
  //       },
  //     });
  //   }
  // }, [cancelOrdersResponse?.status, cancelOrdersResponse?.message]);
  const { userOrders } = useSelector((state) => state?.userOrders);

  useEffect(() => {
    store.dispatch(loadUserOrders());
  }, []);

  const handleOrderCancel = (id) => {
    const order_id = {
      order_id: `${id}`,
    };
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    axios
      .post(`${baseUrl}/customer/order/cancel-order`, order_id, config)
      .then((res) => {
        if (res.data.status === "success") {
          store.dispatch(loadUserOrders());
          toast.success(res.data.message, {
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
          toast.success(res.data.message, {
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

  return (
    <>
      <MetaData title="My Orders - BPPShop" />
      <div className="order_section">
        <h4>My Orders List</h4>
        {userOrders?.length < 1 ? (
          <div className="blank_order">
            <h5>You Don't Have Any Order...</h5>
          </div>
        ) : (
          <table className="table order_table">
            <thead className="order_table_head">
              <td>Order Id</td>
              <td>Order Date</td>
              <td>Status</td>
              <td>Total</td>
              <td>Action</td>
            </thead>
            {userOrders?.length && (
              <tbody className="order_table_body">
                {userOrders?.map((order) => (
                  <tr key={order?.id}>
                    <td data-label="Order Id" className="fw-bold">
                      ID: {order?.id}
                    </td>
                    <td data-label="Order Date">
                      {order?.created_at?.slice(0, 10)}
                    </td>
                    <td data-label="Status">
                      <span className="order_status">
                        {order?.order_status}
                      </span>
                    </td>
                    <td data-label="Total">
                    &#2547; {order?.order_amount + order?.shipping_cost}
                    </td>
                    <td data-label="Action">
                      <Link to={`/profile/orders-detail/${order?.id}`}>
                        <button className="my_order_view_btn">
                          <i className="bi bi-eye-fill"></i> View
                        </button>
                      </Link>
                      {order?.order_status == "canceled" ? 
                      <button
                        // onClick={() => handleOrderCancel(order?.id)}
                        className="my_order_canceled_btn"
                      >
                        <i className="bi bi-trash3-fill"></i> Canceled
                      </button> : 
                      <button
                      onClick={() => handleOrderCancel(order?.id)}
                      className="my_order_cancel_btn"
                    >
                      <i className="bi bi-trash3-fill"></i> Cancel
                    </button>
                      }
                      
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        )}
      </div>
    </>
  );
};

export default OrderHome;
