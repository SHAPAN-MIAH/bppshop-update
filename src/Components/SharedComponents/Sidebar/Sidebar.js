import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl, categoryBaseUrl } from "./../../../BaseUrl/BaseUrl";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const allCategory = useSelector((state) => state.allCategories.categories.data);
  // const [allCategory, setAllCategory] = useState([]);
  // const [subCategory, setSubCategory] = useState([]);
  // const [categorySlugName, setCategorySlugName] = useState([]);
  // const [subCategorySlugName, setSubCategorySlugName] = useState([]);

  // console.log(subCategory);

  // useEffect(() => {
  //   axios.get(`${baseUrl}/categories`).then((res) => {
  //     setAllCategory(res?.data?.data);
  //   });
  // }, []);

  // const subMenuHandler = (slug, index) => {
  //   setCategorySlugName(slug);

  //   const subCategories = allCategory.find((item) => item.slug === slug);

  //   setSubCategory(subCategories.childes);
  //   const categoryItem = document.getElementById(`categoryItem ${index}`);

  //   const subMenu = document.querySelector(".subMenu");

  //   categoryItem.append(subMenu);

  //   if (subCategories) {
  //     const subMenu = document.querySelector(".subMenu");
  //     const chevronRight = document.querySelector(".chevronRight");

  //     subMenu.classList.toggle("subMenuActive");
  //     chevronRight.classList.toggle("arrowToggle");
  //   }
  // };

  // const [subSubCategoryList, setSubSubCategoryList] = useState([]);
  // const subSubCategoryViewHandler = (subSlug, indx) => {
  //   setSubCategorySlugName(subSlug);

  //   const subCategories = allCategory.find(
  //     (item) => item.slug === categorySlugName
  //   );
  //   const subSubCategories = subCategories?.childes.find(
  //     (item) => item.slug === subSlug
  //   );
  //   setSubSubCategoryList(subSubCategories);

  //   // const subSubCategoryItem = document.getElementById(
  //   //   `subSubCategoryItem ${indx}`
  //   // );

  //   // const subSubMenu = document.querySelector(".subSubMenu");
  //   // subSubCategoryItem.append(subSubMenu);

  //   if (subSubCategories.slug === subSlug) {
  //     const subSubCategoryItem = document.getElementById(
  //       `subSubCategoryItem ${indx}`
  //     );

  //     const subSubMenu = document.querySelector(".subSubMenu");
  //     subSubCategoryItem.append(subSubMenu);
  //   }

  //   if (subSubCategories) {
  //     const subSubMenu = document.querySelector(".subSubMenu");
  //     subSubMenu.classList.toggle("subSubMenuActive");
  //   }
  // };

  const [expandedCategories, setExpandedCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const sidebarToggleExpand = (categoryIndex) => {
    setActiveCategory(categoryIndex);

    setExpandedCategories(
      expandedCategories.includes(categoryIndex)
        ? expandedCategories.filter((index) => index !== categoryIndex)
        : [...expandedCategories, categoryIndex]
    );

    // console.log(categoryIndex.id)
    if (activeCategory) {
      const subMenu = document.querySelector(".subMenu");
      const subSubMenu = document.querySelector(".subSubMenu");
      subMenu.classList.toggle("subMenuActive");
      subSubMenu.classList.toggle("subSubMenuActive");
    }
  };

  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeSubSubMenu, setActiveSubSubMenu] = useState(null);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    setActiveSubMenu('');
    setActiveSubSubMenu('');

    
  };
  const handleSubMenuClick = (subMenu) => {
    // setExpandedCategories("");
    setActiveSubMenu(subMenu);
    setActiveSubSubMenu('')
    
  };
  const handleSubSubMenuClick = (subSubMenu) => {
    setActiveSubSubMenu(subSubMenu);
    // setExpandedCategories("");
  };

  return (
    <>
      <div className="sidebar-toggle-section">
        <input type="checkbox" name="" id="openSidebarMenu" />
        <label htmlFor="openSidebarMenu" className="sidebarIconToggle">
          <i className="bi bi-list"></i>
        </label>
        <div id="sidebarMenu">
          <ul className="menu">
            <Link to="/">
              <li className="homeIcon">
                <i className="bi bi-house-door-fill"></i>
              </li>
            </Link>
            <hr />
            {allCategory?.map((categoryItem, categoryIndex) => {
              return (
                <ul key={categoryIndex} className="categoryMenu">
                  <li onClick={() => sidebarToggleExpand(categoryIndex)}>
                    <Link to={`/${categoryItem?.slug}`}
                     onClick={() =>
                      handleMenuClick(categoryItem.id)
                    }
                    className={
                      activeMenu === categoryItem.id
                        ? "subSubMenuActive"
                        : ""
                    }
                    >
                      <div>
                        <img
                          width="15"
                          className="sidebar-Icon"
                          src={categoryBaseUrl + `/${categoryItem.icon}`}
                          alt=""
                        />
                        {categoryItem?.name}
                      </div>
                      <span>
                        <i className="bi bi-chevron-right chevronRight"></i>
                      </span>
                    </Link>
                  </li>
                  {expandedCategories?.includes(categoryIndex) && (
                    <div>
                      {categoryItem?.childes?.map(
                        (subcategory, subcategoryIndex) => {
                          return (
                            <ul
                              key={subcategoryIndex}
                              className="subMenu"
                              id={`subSubCategoryItem ${subcategoryIndex}`}
                            >
                              <li
                                onClick={() =>
                                  sidebarToggleExpand(
                                    categoryIndex + "-" + subcategoryIndex
                                  )
                                }
                              >
                                <Link
                                  to={`/${categoryItem?.slug}/${subcategory?.slug}`}
                                  onClick={() =>
                                    handleSubMenuClick(subcategory.id)
                                  }
                                  className={
                                    activeSubMenu === subcategory.id
                                      ? "subMenuActive"
                                      : ""
                                  }
                                >
                                  {subcategory?.name}
                                </Link>
                              </li>
                              {expandedCategories?.includes(
                                categoryIndex + "-" + subcategoryIndex
                              ) && (
                                <ul className="subSubMenu">
                                  {subcategory?.childes?.map(
                                    (subsubcategory, subsubcategoryIndex) => {
                                      return (
                                        <li
                                          key={subsubcategoryIndex}
                                        >
                                          <Link
                                            to={`/${categoryItem?.slug}/${subcategory?.slug}/${subsubcategory?.slug}`}
                                            onClick={() =>
                                              handleSubSubMenuClick(subsubcategory.id)
                                            }
                                            className={
                                              activeSubSubMenu === subsubcategory.id
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

            {/* {allCategory?.map((categoryItem, index) => (
              <li
                key={index}
                id={`categoryItem ${index}`}
                className=""
                onClick={() => subMenuHandler(categoryItem?.slug, index)}
              >
                <Link to={`/${categoryItem?.slug}`}>
                  <div>
                    <img
                      width="15"
                      className="sidebar-Icon"
                      src={categoryBaseUrl + `/${categoryItem.icon}`}
                      alt=""
                    />
                    {categoryItem?.name}
                  </div>
                  <span>
                    <i className="bi bi-chevron-right chevronRight"></i>
                  </span>
                </Link>
              </li>
            ))} */}

            {/* <ul className=" subMenu">
              {subCategory?.map((item, indx) => (
                <Link to={`/${categorySlugName}/${item?.slug}`}>
                  <li
                    key={indx}
                    id={`subSubCategoryItem ${indx}`}
                    onClick={() => subSubCategoryViewHandler(item?.slug, indx)}
                  >
                    {item?.name}
                  </li>
                  <ul className=" subSubMenu">
                    {subSubCategoryList?.childes?.map((item, index) => (
                      <Link
                        to={`/${categorySlugName}/${subCategorySlugName}/${item?.slug}`}
                      >
                        <li key={item.index}>{item?.name}</li>
                      </Link>
                    ))}
                  </ul>
                </Link>
              ))}
            </ul> */}

            {/* <ul className=" subMenu">
              {subCategory?.map((item, indx) => (
                <li
                  key={indx}
                  id={`subSubCategoryItem ${indx}`}
                  onClick={() => subSubCategoryViewHandler(item?.slug, indx)}
                >
                  <Link to={`/${categorySlugName}/${item?.slug}`}>
                    {item?.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className=" subSubMenu">
              {subSubCategoryList?.childes?.map((item, index) => (
                <li key={item.index}>
                  <Link
                    to={`/${categorySlugName}/${subCategorySlugName}/${item?.slug}`}
                  >
                    {item?.name}
                  </Link>
                </li>
              ))}
            </ul> */}
          </ul>

          {/* <div> */}
          {/* {allCategory?.map((category, categoryIndex) => {
        return(
        <div key={categoryIndex}>
          <li onClick={() => toggleExpand(categoryIndex)}>
            {category.name}
          </li>
          {expandedCategories?.includes(categoryIndex) && (
            <div>
              {category?.childes?.map((subcategory, subcategoryIndex) => {
                return(
                <div key={subcategoryIndex}>
                  <li onClick={() => toggleExpand(categoryIndex + "-" + subcategoryIndex)}>
                    {subcategory.name}
                  </li>
                  {expandedCategories?.includes(categoryIndex + "-" + subcategoryIndex) && (
                    <ul>
                      {subcategory?.childes?.map((subsubcategory, subsubcategoryIndex) => {
                        console.log(subsubcategory.name)
                        return(
                        <li key={subsubcategoryIndex}>{subsubcategory.name}</li>
                      )
                      })}
                    </ul>
                  )}
                </div>
              )
              })}
            </div>
          )}
        </div>
      )
      })} */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
