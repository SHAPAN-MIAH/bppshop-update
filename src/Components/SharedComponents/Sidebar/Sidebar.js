import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { categoryBaseUrl } from "./../../../BaseUrl/BaseUrl";
import { useSelector } from "react-redux";
import noImg from "../../../Assets/Images/noImg-default.png";


const Sidebar = () => {
  const allCategory = useSelector(
    (state) => state.allCategories.categories.data
  );

  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeSubSubMenu, setActiveSubSubMenu] = useState(null);

  const handleMenuClick = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const handleSubMenuClick = (subcategory) => {
    setActiveSubMenu(activeSubMenu === subcategory ? null : subcategory);
    setActiveSubSubMenu("");
  };

  const handleSubSubMenuClick = (subsubcategory) => {
    setActiveSubSubMenu(
      activeSubSubMenu === subsubcategory ? null : subsubcategory
    );
  };

  const isCategoryExpanded = (category) => {
    return activeCategory === category;
  };

  const isSubMenuExpanded = (subcategory) => {
    return activeSubMenu === subcategory;
  };

  // const isSubSubMenuExpanded = (subsubcategory) => {
  //   return activeSubSubMenu === subsubcategory;
  // };

  // const sidebarOpenHandler = () => {
  //   const sidebarMenu = document.querySelector("#sidebarMenu");
  //   const openSidebarIconToggle = document.querySelector(
  //     ".openSidebarIconToggle"
  //   );
  //   const closeSidebarIconToggle = document.querySelector(
  //     ".closeSidebarIconToggle"
  //   );

  //   sidebarMenu.style.transform = "translateX(0px)";
  //   closeSidebarIconToggle.style.display = "block";
  //   openSidebarIconToggle.style.display = "none";
  // };

  // const sidebarCloseHandler = () => {
  //   const sidebarMenu = document.querySelector("#sidebarMenu");
  //   const openSidebarIconToggle = document.querySelector(
  //     ".openSidebarIconToggle"
  //   );
  //   const closeSidebarIconToggle = document.querySelector(
  //     ".closeSidebarIconToggle"
  //   );

  //   sidebarMenu.style.transform = "translateX(-300px)";
  //   closeSidebarIconToggle.style.display = "none";
  //   openSidebarIconToggle.style.display = "block";
  // };

  const activeViewHandler = () => {
    setActiveSubSubMenu("");
  };

  return (
    <>
     

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
                                  src={categoryBaseUrl + `/${subMenu?.icon}`}
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
                                      {subMenu?.childes?.map((subSubMenu) => {
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
                                      })}
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
    </>
  );
};

export default Sidebar;
