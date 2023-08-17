import React, { useEffect } from "react";
import "./OrderDetails.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUserOrderDetails } from "../../../Redux/Actions/UserOrderAction";
import { imgThumbnailBaseUrl } from "../../../BaseUrl/BaseUrl";
import MetaData from "../../../Pages/Layout/MetaData";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { userOrders } = useSelector((state) => state?.userOrders);
  const { userOrderDetails } = useSelector((state) => state?.userOrderDetails);
  const userOrder = userOrders?.find((order) => order?.id === parseInt(id));
  const OrderDetails = userOrderDetails?.map((orderDetail) => orderDetail);

  useEffect(() => {
    dispatch(loadUserOrderDetails(id));
  }, [dispatch, id]);

  let subTotal = 0;
  let taxFee = 0;
  let shippingFee = 0;
  let discountAmount = 0;

  return (
    <>
      <MetaData title="Orders-Details - BPPShop" />
      <div>
        <Link to="/profile/orders">
          <button className=" OrderListBackBtn  rounded-2 py-2 px-4 my-2 mb-3 ">
            <i className="bi bi-arrow-left-circle mr-2"></i> Back
          </button>
        </Link>
        <div className="order_detail_card">
          <div className="payment  table-responsive">
            <table className="table table-borderless">
              <thead>
                <tr className="order_table_tr order_table_head">
                  <td className="order_table_td">
                    <div className="order_table_info_div">
                      <div className="order_table_info_div_1 py-2">
                        <span>Order no: </span>
                        <br />
                        <span> {userOrder?.id} </span>
                      </div>
                    </div>
                  </td>
                  <td className="order_table_td">
                    <div className="order_table_info_div">
                      <div className="order_table_info_div_1 py-2">
                        <span>Order date: </span>
                        <br />
                        <span> {userOrder?.created_at?.slice(0, 10)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="order_table_td">
                    <div className="order_table_info_div">
                      <div className="order_table_info_div_1">
                        <span>Delivery address: </span>
                      </div>

                      <div className="order_table_info_div_2">
                        <span>
                          {
                            userOrder?.shipping_address_data
                              ?.contact_person_name
                          }
                          ({userOrder?.shipping_address_data?.phone}),{" "}
                          {userOrder?.shipping_address_data?.address},
                          {userOrder?.shipping_address_data?.city} ,{" "}
                          {userOrder?.shipping_address_data?.thana},
                          {userOrder?.shipping_address_data?.zip}
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              </thead>
            </table>

            <div className="px-2">
              <table className="table table-borderless">
                {OrderDetails?.map((order) => {
                  subTotal += order?.qty * order?.product_details?.unit_price;
                  taxFee += order?.product_details?.tax;
                  shippingFee = userOrder?.shipping_cost;
                  discountAmount += order?.discount;

                  return (
                    <tbody key={order?.product_details?.id}>
                      <tr className="order_detail_list">
                        <td className="col-1 for-tab-img">
                          <img
                            src={
                              imgThumbnailBaseUrl +
                              `/${order?.product_details?.thumbnail}`
                            }
                            alt=""
                          />
                        </td>
                        <td className="col-5 ">
                          <span className="for-glaxy-name">
                            {order?.product_details?.name}... [
                            {order?.product_details?.id}]
                          </span>
                          <br />
                          <span className="amount">
                            Unit Price: &#2547;{" "}
                            {order?.product_details?.unit_price}{" "}
                          </span>
                          <br />
                          <span>Qty: {order?.qty} </span>
                          <br />
                          <span>Variant: {order.variant}</span>
                          <br />
                          <Link to={`/add-product-review/${order?.product_id}`}>
                            <button className="add_review_btn">
                              Add Review
                            </button>
                          </Link>
                        </td>
                        <td className="col-2 ">
                          <div>
                            Total:
                            <br />{" "}
                            <span>
                              &#2547;{" "}
                              {order?.qty * order?.product_details?.unit_price}
                            </span>
                          </div>
                        </td>
                        <td className="col-2 ">
                          <div>
                            Discount Price:
                            <br /> <span>&#2547; {order.discount}</span>
                          </div>
                        </td>
                        <td className="col-1 ">
                          <div className="text-right">
                            <span className="font-weight-bold amount ">
                              Price: <br />
                              &#2547;{" "}
                              {order?.qty * order?.product_details?.unit_price -
                                order.discount}
                            </span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-end">
          <div className="col-md-8 col-lg-5">
            <table className="table table-borderless">
              <tbody className="totals">
                <tr>
                  <td>
                    <div className="text-left">
                      <span className="product-qty ">Item </span>
                    </div>
                  </td>
                  <td>
                    <div className="text-right">
                      <span>{userOrderDetails?.length}</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div className="text-left">
                      <span className="product-qty ">Subtotal</span>
                    </div>
                  </td>
                  <td>
                    <div className="text-right">
                      <span>&#2547; {subTotal}.00</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div className="text-left">
                      <span className="product-qty ">Tax Fee</span>
                    </div>
                  </td>
                  <td>
                    <div className="text-right">
                      <span>&#2547; {taxFee}.00</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="text-left">
                      <span className="product-qty ">Shipping Fee</span>
                    </div>
                  </td>
                  <td>
                    <div className="text-right">
                      <span>&#2547; {shippingFee}.00</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div className="text-left">
                      <span className="product-qty ">Discount On Product</span>
                    </div>
                  </td>
                  <td>
                    <div className="text-right">
                      <span>-&#2547; {discountAmount}.00</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div className="text-left">
                      <span className="product-qty ">Coupon Discount</span>
                    </div>
                  </td>
                  <td>
                    <div className="text-right">
                      <span>-</span>
                    </div>
                  </td>
                </tr>

                <tr className="border-top border-bottom">
                  <td>
                    <div className="text-left">
                      <span className="font-weight-bold">Total</span>
                    </div>
                  </td>
                  <td>
                    <div className="text-right">
                      <span className="font-weight-bold amount ">
                        &#2547;{" "}
                        {subTotal + shippingFee + taxFee - discountAmount}.00
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="track_order_btn">
            <Link to={`/profile/track-order/${id}`}>
              <button>Track Order</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
