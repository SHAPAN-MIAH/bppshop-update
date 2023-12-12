import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import defaultAvatar from "../../../Assets/Images/default-avatar.jpg";
// import bppShopsLogo from "../../../Assets/Images/Currection logo-02-01.png";
import bppShopLogo from "../../../Assets/Images/Orenge logo.png";
import bppshopIconLogo from "../../../Assets/Images/Orenge bg 02png.png";
import Sidebar from "../Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearAddToCartRes,
  ClearCart,
  ClearCartGroupItems,
} from "./../../../Redux/Actions/CartAction";
import {
  clearAllShippingAddress,
  clearShippingAddress,
} from "../../../Redux/Actions/ShippingAddressAction";
import axios from "axios";
import { baseUrl } from "./../../../BaseUrl/BaseUrl";
import { ClearDeliveryCharge } from "../../../Redux/Actions/DeliveryChargeAction";
import toast from "react-hot-toast";
import {
  clearLoginRes,
  clearRegisterRes,
  logout,
} from "./../../../Redux/Actions/UserAction";
import {
  searchProduct,
  searchProductByCategory,
} from "../../../Redux/Actions/SearchAction";
import { useState } from "react";
import { clearUserOrders } from "../../../Redux/Actions/UserOrderAction";
import Modal from "react-modal";
import LoginModal from "../../../Pages/User/Login/LoginModal";
import SignUpModal from "../../../Pages/User/SignUp/SignUpModal";
import ResponsiveSidebar from "../Sidebar/ResponsiveSidebar";
import partnerIcon from "../../../Assets/Images/PngItem_786610.png";
// import { LuUser2 } from "react-icons/lu";
import { LuHeartHandshake, LuUser, LuUsers } from "react-icons/lu";
import { CiLogin } from "react-icons/ci";
import { SiGnuprivacyguard } from "react-icons/si";
import { MdOutlineHandshake } from "react-icons/md";


Modal.setAppElement("#root");

let customStyles = {
  content: {
    width: "400px",
    top: "55%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "0px",
    paddingBottom: "20px",
  },
};

const Nav = () => {
  if (window.matchMedia("(max-width: 460px)").matches) {
    customStyles = {
      content: {
        width: "360px",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "0px",
        paddingBottom: "20px",
      },
    };
  }

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { loginRes } = useSelector((state) => state.loginRes);
  const { isAuthenticated } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user.user);
  const allCategories = useSelector(
    (state) => state.allCategories.categories.data
  );
  const [SuggestedCategory, setSuggestedCategory] = useState([]);

  // search Suggestion..................................
  const [suggestion, setSuggestion] = useState("");

  let categoryList = [];

  function keepAllCategoryInAList(data) {
    if (data.hasOwnProperty("childes")) {
      data.childes.forEach((element) => {
        keepAllCategoryInAList(element);
      });
    } else {
      categoryList.push(data);
    }
  }
  allCategories &&
    allCategories.forEach(function (element) {
      keepAllCategoryInAList(element);
    });

  //search functionality.......
  // const [loading,setloading]=useState(true)
  let offset = 1;
  let limit = 100;
  // const url = baseUrl + "/products/search";

  const handleSearchByKeyUp = (e) => {
    e.preventDefault();
    const suggestedItemContainer = document.querySelector(
      ".suggested_item_container"
    );

    setSuggestedCategory(
      categoryList.filter((i) => i.name.toLowerCase().includes(e.target.value))
    );

    if (SuggestedCategory.length > 0) {
      suggestedItemContainer.style.display = "block";
    }

    const searchData = {
      name: `${e.target.value}`,
      limit: `${limit}`,
      offset: `${offset}`,
    };
    dispatch(searchProduct(searchData));

    // axios({ method: "post", url, data }).then((res) => {
    //   dispatch(searchProduct(res.data.products));
    e.target.value && navigate("/search");
    // });
  };

  const searchSuggestionCloseHandler = () => {
    const suggestedItemContainer = document.querySelector(
      ".suggested_item_container"
    );

    suggestedItemContainer.style.display = "none";
  };

  const onClickSearchBySuggestion = (id, name) => {
    setSuggestion(name);
    dispatch(searchProductByCategory(id));

    searchSuggestionCloseHandler();
  };

  //Logout functionality........
  const handleLogout = () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    axios.get(`${baseUrl}/customer/logout`, config).then((res) => {
      if (res.data.status == "success") {
        dispatch(logout());
        dispatch(ClearCart());
        dispatch(clearShippingAddress());
        dispatch(clearAllShippingAddress());
        dispatch(ClearCartGroupItems());
        dispatch(ClearDeliveryCharge());
        dispatch(clearUserOrders());
        dispatch(ClearAddToCartRes());
        dispatch(clearLoginRes());
        dispatch(clearRegisterRes());

        localStorage.removeItem("token");
        localStorage.removeItem("agentId");
        localStorage.removeItem("SignupRedirect");
        localStorage.removeItem("modalLogin");
        localStorage.removeItem("modalSignup");
        localStorage.removeItem("productCartLoginAddItem");
        localStorage.removeItem("sellerName");
        localStorage.removeItem("brandName");
        localStorage.removeItem("productDetailsPageLoginSignupAddItem");

        navigate("/");

        window.location.reload();

        // toaster
        toast.success(`Logout Successfull`, {
          duration: 3000,
          style: {
            width: "100%",
            height: "80px",
            padding: "0px 20px",
          },
        });
      }
    });
  };

  useEffect(() => {
    if (isAuthenticated == true && token) {
      loginRes?.status == "success" && closeModal();
    }
  }, [loginRes, isAuthenticated, token]);

  return (
    <>
      <div className="navbar-section">
        <nav className="nav">
          <div className="nav-content">
            <div className="d-flex">
              <div className="responsive_sidebar_container">
                <ResponsiveSidebar />
              </div>
              <div className="logo">
                <Link to="/">
                  <img className="bppshopLogo" src={bppShopLogo} alt="" />
                  <img
                    className="bppshopShortLogo"
                    src={bppshopIconLogo}
                    alt=""
                  />
                </Link>

                <img className="bpshopsIcon" src="img/bpp_icon.png" alt="" />
              </div>
            </div>
            <div className="searchInput_container">
              <input
                onKeyUp={handleSearchByKeyUp}
                type="text"
                name="search"
                id="dynamic-placeholder"
                className="search_input"
                placeholder="Search Product..."
                // value={suggestion}
              />

              <span className="searchIcon">
                <button
                  // onClick={handleSearchByClick}
                  type="submit"
                  style={{ border: "none", background: "none" }}
                >
                  <i className="bi bi-search"></i>
                </button>
              </span>

              {SuggestedCategory && (
                <div className="suggested_item_container">
                  {SuggestedCategory?.map((suggestItem) => (
                    <div className="search_item_show">
                      <p
                        onClick={() =>
                          onClickSearchBySuggestion(
                            suggestItem?.id,
                            suggestItem?.name
                          )
                        }
                      >
                        <i className="bi bi-search"></i> {suggestItem?.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="partner_zone">
              <div
                className="partner_zone_dropdown_btn"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {/* <span>
                  Partner Zone <i className="bi bi-chevron-down"></i>
                </span>

                <img width={30} src={partnerIcon} alt="" /> */}

                {/* <LuUsers /> */}
                <LuHeartHandshake />
              </div>
              <div className="dropdown-menu partner_zone_dropdown">
                <Link to="/">
                  <li className="dropdown-item mt-1">Become a Seller</li>
                </Link>
                <Link to="/">
                  <li className="dropdown-item mt-1">Become a Agent</li>
                </Link>
              </div>
            </div>
            <div className="userProfileTab">
              <div
                className="user-profile "
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {/* {user.image ? (
                    <img
                      src={`https://backend.bppshop.com.bd/storage/${user.image}`}
                      alt="profile"
                    />
                  ) : ( */}
                {/* <img src={defaultAvatar} alt="profile" /> */}
                <LuUser />
                {/* )}  */}
              </div>
              {token ? (
                <div className="dropdown-menu profile_dropdown">
                  <div
                    className="d-flex mx-3"
                    style={{
                      // borderBottom: "1px solid gray",
                      padding: "10px 0px",
                      // marginBottom: "10px",
                    }}
                  >
                    {/* {agent.image ? (
                      <img
                        width="30"
                        height="100%"
                        src={`https://agentapi.bppshop.com.bd/${agent.image}`}
                        alt="profile"
                      />
                    ) : ( */}
                    <img
                      width="30"
                      height="100%"
                      src={defaultAvatar}
                      alt="profile"
                    />
                    {/* )} */}

                    <h6 className="mx-2">{user?.name}</h6>
                  </div>
                  <hr />
                  <Link to="/profile">
                    <li className="dropdown-item mt-1">View Profile</li>
                  </Link>

                  <li onClick={() => handleLogout()} className="dropdown-item">
                    Logout
                  </li>
                </div>
              ) : (
                <div className="dropdown-menu profile_dropdown">
                  <li className="dropdown-item" onClick={openModal}>
                  <CiLogin /> Login
                  </li>
                  <li className="dropdown-item" onClick={openModal}>
                  <SiGnuprivacyguard />  Sign-Up
                  </li>
                  {/* <Link to="/login">
                    <li className="dropdown-item">Login</li>
                  </Link>
                  <Link to="/signup">
                    <li className="dropdown-item">Sign-Up</li>
                  </Link> */}

                  {/* <div className="dropdown-menu partner_zone_dropdown"> */}
                  <Link to="/">
                    <li className="dropdown-item mt-1">Become a Seller</li>
                  </Link>
                  <Link to="/">
                    <li className="dropdown-item mt-1">Become a Agent</li>
                  </Link>
                  {/* </div> */}
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Login Modal"
      >
        <span onClick={closeModal} className="modalCloseBtn">
          <i className="bi bi-x-lg"></i>
        </span>
        <div className="LoginModal_container">
          <LoginModal navLoginOpen={true} />
        </div>
        <div className="SignUpModal_container">
          <SignUpModal navLoginOpen={true} />
        </div>
        <br />
        <br />
      </Modal>
    </>
  );
};

export default Nav;
