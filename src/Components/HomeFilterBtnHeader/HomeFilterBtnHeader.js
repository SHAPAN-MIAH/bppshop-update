import React from "react";
import "./HomeFilterBtnHeader.css";
import { Link } from "react-router-dom";

const HomeFilterBtnHeader = () => {
  return (
    <>
      <div className="homeFilterBtnHeader-container-section">
        <div className="header_btn">
        <div>
            <Link to="/sellers-store">
              <button>Store</button>
            </Link>
          </div>
          <div>
            <Link to="/brands">
              <button>Brand's</button>
            </Link>
          </div>
          
          <div>
            <div className="dropdown">
              <button
                className="dropdown-toggle discountFlashSaleBTn"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="">Discounted Products/ Flash Sale</span>
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Link className="dropdown-item" to="/discount-products">Discounted Products</Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/flash-sale">Flash Sale</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="dropdown">
            <button
              className="dropdown-toggle"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="">Hot Items</span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <Link className="dropdown-item" to="/new-arrival">
                  New Arrival
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to="/top-rated">
                  Top Rated
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to="/best-selling">
                  Best Selling
                </Link>
              </li>
            </ul>
          </div>
          <div className="dropdown">
            <button
              className="dropdown-toggle"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="">Partner Zone</span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a
                  className="dropdown-item"
                  href="https://backend.bppshop.com.bd/shop/apply"
                >
                  Become a seller
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="https://backend.bppshop.com.bd/seller/auth/login"
                >
                  Seller Login
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="https://agent.bppshop.com.bd"
                >
                  Become a Agent
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="https://agent.bppshop.com.bd/login"
                >
                  Agent Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeFilterBtnHeader;
