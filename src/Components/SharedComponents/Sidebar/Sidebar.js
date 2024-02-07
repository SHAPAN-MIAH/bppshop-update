import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { categoryBaseUrl } from "./../../../BaseUrl/BaseUrl";
import { useSelector } from "react-redux";
import noImg from "../../../Assets/Images/noImg-default.png";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Sidebar = () => {
  const allCategory = useSelector(
    (state) => state.allCategories.categories.data
  );
  const loading = useSelector((state) => state.allCategories.loading);

  return (
    <>
      <SkeletonTheme baseColor="#DDDDDD" highlightColor="#e3e3e3">
        {loading ? (
          <Skeleton height="400px" borderRadius="5px" count={1} />
        ) : (
          <div className="category_menu">
            <ul className="category_menu_content">
              {allCategory?.map((category, index) => {
                return (
                  <li key={index} className="menu_list">
                    <div className="category_icon">
                      {category?.icon ? (
                        <img
                          width="15"
                          className="sidebar_icon"
                          src={categoryBaseUrl + `/${category?.icon}`}
                          alt=""
                        />
                      ) : (
                        <img src={noImg} alt="" />
                      )}
                    </div>
                    <div className="menu_item">
                      <p>{category?.name}</p>
                      <i className="bi bi-chevron-right chevronRight"></i>
                    </div>

                    <div className="dropdown_menu">
                      <ul className="sub_menu">
                        {category?.childes?.map((subMenu) => {
                          return (
                            <>
                              <li key={subMenu.name} className="sub_menu_list">
                                <div className="category_icon">
                                  {subMenu?.icon ? (
                                    <img
                                      width="15"
                                      className="sidebar_icon"
                                      src={
                                        categoryBaseUrl + `/${subMenu?.icon}`
                                      }
                                      alt=""
                                    />
                                  ) : (
                                    <img src={noImg} alt="" />
                                  )}
                                </div>
                                <div className="sub_menu_item">
                                  <p>{subMenu?.name}</p>
                                  <i className="bi bi-chevron-right chevronRight"></i>
                                </div>
                                <div className="dropdown_menu_1">
                                  <ul className="sub_menu_1">
                                    <div className="sub_menu_1_content">
                                      <h5>{subMenu?.name}</h5>

                                      {subMenu?.childes[0] ? (
                                        <div className="mega_sub_menu">
                                          {subMenu?.childes?.map(
                                            (subSubMenu) => {
                                              return (
                                                <div key={subSubMenu.id}>
                                                  <Link
                                                    to={`/${category?.slug}/${subMenu?.slug}/${subSubMenu?.slug}`}
                                                  >
                                                    <div className="mega_sub_menu_item">
                                                      {!subSubMenu?.icon ? (
                                                        <img src={noImg} />
                                                      ) : (
                                                        <img
                                                          src={`https://backend.bppshop.com.bd/storage/category/${subSubMenu?.icon}`}
                                                          alt=""
                                                        />
                                                      )}

                                                      <p>{subSubMenu?.name}</p>
                                                    </div>
                                                  </Link>
                                                </div>
                                              );
                                            }
                                          )}
                                        </div>
                                      ) : (
                                        <div className="error_msg">
                                          <p>Product Not Found</p>
                                        </div>
                                      )}
                                    </div>
                                  </ul>
                                </div>
                              </li>
                            </>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </SkeletonTheme>
    </>
  );
};

export default Sidebar;
