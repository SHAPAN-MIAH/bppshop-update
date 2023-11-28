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
      {/* <div className="sidebar-section">
        <span className="openSidebarIconToggle" onClick={sidebarOpenHandler}>
          <i className="bi bi-list"></i>
        </span>
        <span className="closeSidebarIconToggle" onClick={sidebarCloseHandler}>
          <i className="bi bi-list"></i>
        </span>

        <div id="sidebarMenu">
          <ul className="menu">
            {allCategory?.map((categoryItem, categoryIndex) => {
              return (
                <ul key={categoryIndex} className="categoryMenu">
                  <li onMouseEnter={() => handleMenuClick(categoryItem.id)}>
                    <Link
                      to={`/${categoryItem?.slug}`}
                      className={
                        isCategoryExpanded(categoryItem.id)
                          ? "subSubMenuActive"
                          : ""
                      }
                    >
                      <div>
                        <img
                          width="15"
                          className="sidebar-Icon"
                          src={categoryBaseUrl + `/${categoryItem?.icon}`}
                          alt=""
                        />
                        {categoryItem?.name}
                      </div>
                      <span>
                        <i className="bi bi-chevron-right chevronRight"></i>
                      </span>
                    </Link>
                  </li>
                  {isCategoryExpanded(categoryItem.id) && (
                    <div className="submenu_container">
                      <Link to={`/${categoryItem?.slug}/all`}>
                        <p
                          onMouseEnter={() => activeViewHandler()}
                          style={{
                            borderBottom: "1px solid rgb(216, 216, 216)",
                            paddingL: "10px 0px",
                            marginBottom: "10px",
                            fontSize: "12px",
                            cursor: "pointer",
                            fontWeight: "600",
                          }}
                        >
                          All {categoryItem?.name}
                        </p>
                      </Link>

                      {categoryItem?.childes?.map(
                        (subcategory, subcategoryIndex) => {
                          return (
                            <ul
                              key={subcategoryIndex}
                              className="subMenu"
                              id={`subSubCategoryItem ${subcategoryIndex}`}
                            >
                              <li
                                onMouseEnter={() =>
                                  handleSubMenuClick(subcategory.id)
                                }
                              >
                                <Link
                                  to={`/${categoryItem?.slug}/${subcategory?.slug}`}
                                  className={
                                    isSubMenuExpanded(subcategory.id)
                                      ? "subMenuActive"
                                      : ""
                                  }
                                >
                                  {subcategory?.name}
                                </Link>
                              </li>

                              {isSubMenuExpanded(subcategory.id) && (
                                <div className="subSubMenu_container">
                                  <Link
                                    to={`/${categoryItem?.slug}/${subcategory?.slug}/all`}
                                  >
                                    <p
                                      onMouseEnter={() => activeViewHandler()}
                                      style={{
                                        borderBottom:
                                          "1px solid rgb(216, 216, 216)",
                                        paddingL: "10px 0px",
                                        marginBottom: "10px",
                                        fontSize: "12px",
                                        cursor: "pointer",
                                        fontWeight: "600",
                                      }}
                                    >
                                      All {subcategory?.name}
                                    </p>
                                  </Link>
                                  <ul className="subSubMenu">
                                    {subcategory?.childes?.map(
                                      (subsubcategory, subsubcategoryIndex) => {
                                        return (
                                          <li
                                            key={subsubcategoryIndex}
                                            onMouseEnter={() =>
                                              handleSubSubMenuClick(
                                                subsubcategory.id
                                              )
                                            }
                                          >
                                            <Link
                                              to={`/${categoryItem?.slug}/${subcategory?.slug}/${subsubcategory?.slug}`}
                                              className={
                                                activeSubSubMenu ===
                                                subsubcategory.id
                                                  ? "subSubMenuActive"
                                                  : ""
                                              }
                                            >
                                              {subsubcategory?.name}
                                            </Link>
                                          </li>
                                        );
                                      }
                                    )}
                                  </ul>
                                </div>
                              )}
                            </ul>
                          );
                        }
                      )}
                    </div>
                  )}
                </ul>
              );
            })}
          </ul>
        </div>
      </div> */}

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
                          <li className="sub_menu_list">
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
                                          <>
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
                                          </>
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
