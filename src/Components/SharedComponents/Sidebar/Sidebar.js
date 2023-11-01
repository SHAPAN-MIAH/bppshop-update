// import React, { useState } from "react";
// import "./Sidebar.css";
// import { Link } from "react-router-dom";
// import { categoryBaseUrl } from "./../../../BaseUrl/BaseUrl";
// import { useSelector } from "react-redux";

// const Sidebar = () => {
//   const allCategory = useSelector(
//     (state) => state.allCategories.categories.data
//   );

//   const [expandedCategories, setExpandedCategories] = useState([]);
//   const [activeCategory, setActiveCategory] = useState(null);

//   const sidebarToggleExpand = (categoryIndex) => {
//     setExpandedCategories(
//       expandedCategories.includes(categoryIndex)
//         ? expandedCategories.filter((index) => index !== categoryIndex)
//         : [...expandedCategories, categoryIndex]
//     );

//     setActiveCategory(categoryIndex);
//     if (activeCategory) {
//       const subMenu = document.querySelector(".subMenu");
//       const subSubMenu = document.querySelector(".subSubMenu");

//       subMenu.classList.toggle("subMenuActive");
//       subSubMenu.classList.toggle("subSubMenuActive");
//     }
//   };

//   const [activeMenu, setActiveMenu] = useState(null);
//   const [activeSubMenu, setActiveSubMenu] = useState(null);
//   const [activeSubSubMenu, setActiveSubSubMenu] = useState(null);

//   const handleMenuClick = (menu) => {
//     setActiveMenu(menu);
//     setActiveSubMenu("");
//     setActiveSubSubMenu("");
//   };
//   const handleSubMenuClick = (subMenu) => {
//     setActiveSubMenu(subMenu);
//     setActiveSubSubMenu("");
//   };
//   const handleSubSubMenuClick = (subSubMenu) => {
//     setActiveSubSubMenu(subSubMenu);
//   };

//   // Function to toggle the content
//   const sidebarOpenHandler = () => {
//     const sidebarMenu = document.querySelector("#sidebarMenu");
//     const openSidebarIconToggle = document.querySelector(
//       ".openSidebarIconToggle"
//     );
//     const closeSidebarIconToggle = document.querySelector(
//       ".closeSidebarIconToggle"
//     );

//     sidebarMenu.style.transform = "translateX(0px)";
//     closeSidebarIconToggle.style.display = "block";
//     openSidebarIconToggle.style.display = "none";
//   };

//   const sidebarCloseHandler = () => {
//     const sidebarMenu = document.querySelector("#sidebarMenu");
//     const openSidebarIconToggle = document.querySelector(
//       ".openSidebarIconToggle"
//     );
//     const closeSidebarIconToggle = document.querySelector(
//       ".closeSidebarIconToggle"
//     );

//     sidebarMenu.style.transform = "translateX(-300px)";
//     closeSidebarIconToggle.style.display = "none";
//     openSidebarIconToggle.style.display = "block";
//   };

//   return (
//     <>
//       <div className="sidebar-section">
//         {/* <input
//           type="checkbox"
//           name=""
//           id="openSidebarMenu"
//           onClick={sideBarToggle}
//         /> */}
//         {/* <label htmlFor="openSidebarMenu" className="sidebarIconToggle">
//           <i className="bi bi-list"></i>
//         </label> */}

//         <span className="openSidebarIconToggle" onClick={sidebarOpenHandler}>
//           <i className="bi bi-list"></i>
//         </span>
//         <span className="closeSidebarIconToggle" onClick={sidebarCloseHandler}>
//           <i className="bi bi-list"></i>
//         </span>

//         <div id="sidebarMenu">
//           <ul className="menu">
//             <Link to="/">
//               <li className="homeIcon">
//                 <i className="bi bi-house-door-fill"></i>
//               </li>
//             </Link>
//             <hr />
//             {allCategory?.map((categoryItem, categoryIndex) => {
//               return (
//                 <ul key={categoryIndex} className="categoryMenu">
//                   <li onClick={() => sidebarToggleExpand(categoryIndex)}>
//                     <Link
//                       to={`/${categoryItem?.slug}`}
//                       onClick={() => handleMenuClick(categoryItem.id)}
//                       className={
//                         activeMenu == categoryItem.id ? "subSubMenuActive" : ""
//                       }
//                     >
//                       <div>
//                         <img
//                           width="15"
//                           className="sidebar-Icon"
//                           src={categoryBaseUrl + `/${categoryItem.icon}`}
//                           alt=""
//                         />
//                         {categoryItem?.name}
//                       </div>
//                       <span>
//                         <i className="bi bi-chevron-right chevronRight"></i>
//                       </span>
//                     </Link>
//                   </li>
//                   {expandedCategories?.includes(categoryIndex) && (
//                     <div>
//                       <Link to={`/${categoryItem?.slug}/all`}>
//                         <p
//                           style={{
//                             borderBottom: "1px solid rgb(216, 216, 216)",
//                             paddingL: "10px 0px",
//                             marginBottom: "10px",
//                             fontSize: "12px",
//                             cursor: "pointer",
//                             fontWeight: "600",
//                           }}
//                         >
//                           All {categoryItem?.name}
//                         </p>
//                       </Link>

//                       {categoryItem?.childes?.map((subcategory, subcategoryIndex) => {
//                           return (
//                             <ul
//                               key={subcategoryIndex}
//                               className="subMenu"
//                               id={`subSubCategoryItem ${subcategoryIndex}`}
//                             >
//                               <li
//                                 onClick={() =>
//                                   sidebarToggleExpand(
//                                     categoryIndex + "-" + subcategoryIndex
//                                   )
//                                 }
//                               >
//                                 <Link
//                                   to={`/${categoryItem?.slug}/${subcategory?.slug}`}
//                                   onClick={() =>
//                                     handleSubMenuClick(subcategory.id)
//                                   }
//                                   className={
//                                     activeSubMenu == subcategory.id
//                                       ? "subMenuActive"
//                                       : ""
//                                   }
//                                 >
//                                   {subcategory?.name}
//                                 </Link>
//                               </li>

//                               {expandedCategories?.includes(categoryIndex + "-" + subcategoryIndex) && 
//                                (<div>
//                                   <Link
//                                     to={`/${categoryItem?.slug}/${subcategory?.slug}/all`}
//                                   >
//                                     <p
//                                       style={{
//                                         borderBottom:
//                                           "1px solid rgb(216, 216, 216)",
//                                         paddingL: "10px 0px",
//                                         marginBottom: "10px",
//                                         fontSize: "12px",
//                                         cursor: "pointer",
//                                         fontWeight: "600",
//                                       }}
//                                     >
//                                       All {subcategory?.name}
//                                     </p>
//                                   </Link>
//                                   <ul className="subSubMenu">
//                                     {subcategory?.childes?.map(
//                                       (subsubcategory, subsubcategoryIndex) => {
//                                         return (
//                                           <li key={subsubcategoryIndex}>
//                                             <Link
//                                               to={`/${categoryItem?.slug}/${subcategory?.slug}/${subsubcategory?.slug}`}
//                                               onClick={() =>
//                                                 handleSubSubMenuClick(
//                                                   subsubcategory.id
//                                                 )
//                                               }
//                                               className={
//                                                 activeSubSubMenu ===
//                                                 subsubcategory.id
//                                                   ? "subSubMenuActive"
//                                                   : ""
//                                               }
//                                             >
//                                               {subsubcategory?.name}
//                                             </Link>
//                                           </li>
//                                         );
//                                       }
//                                     )}
//                                   </ul>
//                                 </div>)
//                               }
//                             </ul>
//                           );
//                         }
//                       )}
//                     </div>
//                   )}
//                 </ul>
//               );
//             })}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;



import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { categoryBaseUrl } from "./../../../BaseUrl/BaseUrl";
import { useSelector } from "react-redux";

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
    setActiveSubSubMenu("")
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


    const sidebarOpenHandler = () => {
    const sidebarMenu = document.querySelector("#sidebarMenu");
    const openSidebarIconToggle = document.querySelector(
      ".openSidebarIconToggle"
    );
    const closeSidebarIconToggle = document.querySelector(
      ".closeSidebarIconToggle"
    );

    sidebarMenu.style.transform = "translateX(0px)";
    closeSidebarIconToggle.style.display = "block";
    openSidebarIconToggle.style.display = "none";
  };

  const sidebarCloseHandler = () => {
    const sidebarMenu = document.querySelector("#sidebarMenu");
    const openSidebarIconToggle = document.querySelector(
      ".openSidebarIconToggle"
    );
    const closeSidebarIconToggle = document.querySelector(
      ".closeSidebarIconToggle"
    );

    sidebarMenu.style.transform = "translateX(-300px)";
    closeSidebarIconToggle.style.display = "none";
    openSidebarIconToggle.style.display = "block";
  };

  const activeViewHandler = () => {
    setActiveSubSubMenu("")
  }

  return (
    <>
      <div className="sidebar-section">
        <span className="openSidebarIconToggle" onClick={sidebarOpenHandler}>
          <i className="bi bi-list"></i>
        </span>
        <span className="closeSidebarIconToggle" onClick={sidebarCloseHandler}>
          <i className="bi bi-list"></i>
        </span>

        <div id="sidebarMenu">
          <ul className="menu">
            {/* <Link to="/">
              <li className="homeIcon">
                <i className="bi bi-house-door-fill"></i>
              </li>
            </Link>
            <hr /> */}
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
                    <div>
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

                      {categoryItem?.childes?.map((subcategory, subcategoryIndex) => {
                          return (
                            <ul
                              key={subcategoryIndex}
                              className="subMenu"
                              id={`subSubCategoryItem ${subcategoryIndex}`}
                            >
                              <li onMouseEnter={() => handleSubMenuClick(subcategory.id)}>
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

                              {isSubMenuExpanded(subcategory.id) && 
                               (<div>
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
                                          <li key={subsubcategoryIndex} onMouseEnter={() => handleSubSubMenuClick(subsubcategory.id)}>
                                            <Link
                                              to={`/${categoryItem?.slug}/${subcategory?.slug}/${subsubcategory?.slug}`}
                                              className={
                                                // isSubSubMenuExpanded(subsubcategory.id)
                                                activeSubSubMenu ==
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
                                </div>)
                              }
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

export default Sidebar;
