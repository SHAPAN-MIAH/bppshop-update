import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./ResponsiveSidebar.css";
import { Link } from "react-router-dom";
import { categoryBaseUrl } from "./../../../BaseUrl/BaseUrl";

const ResponsiveSidebar = () => {
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

  const isSubSubMenuExpanded = (subsubcategory) => {
    return activeSubSubMenu === subsubcategory;
  };

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
      <div className="responsive_sidebar_section">
        <input type="checkbox" name="" id="openSidebarMenu" />
        <label htmlFor="openSidebarMenu" className="sidebarIconToggle">
          <i className="bi bi-list"></i>
        </label>
        <div id="responsiveSidebarMenu">
          <ul className="responsive_menu">
            {allCategory?.map((categoryItem, categoryIndex) => {
              return (
                <ul key={categoryIndex} className="responsive_category_menu">
                  <li onClick={() => handleMenuClick(categoryItem.id)}>
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
                    <div className="responsive_submenu_container">
                      <Link to={`/${categoryItem?.slug}/all`}>
                        <p
                          onClick={() => activeViewHandler()}
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
                              className="responsive_sub_menu"
                              id={`subSubCategoryItem ${subcategoryIndex}`}
                            >
                              <li
                                onClick={() =>
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
                                <div className="responsive_subSubMenu_container">
                                  <Link
                                    to={`/${categoryItem?.slug}/${subcategory?.slug}/all`}
                                  >
                                    <p
                                      onClick={() => activeViewHandler()}
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
                                  <ul className="responsive_subSubMenu">
                                    {subcategory?.childes?.map(
                                      (subsubcategory, subsubcategoryIndex) => {
                                        return (
                                          <li
                                            key={subsubcategoryIndex}
                                            onClick={() =>
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
      </div>
    </>
  );
};

export default ResponsiveSidebar;
