import React from "react";
import { useNavigate } from "react-router-dom";
import defaultProImg from "../../../Assets/Images/defaultImg.jpg";
import { categoryBaseUrl } from "../../../BaseUrl/BaseUrl";

const CategoryCard = ({ category }) => {
  // console.log(category);
  const { img, name, id, slug, thumb } = category;
  const navigate = useNavigate();

  const handleSubCategoryView = (id) => {
    if (id) {
      navigate(`/${slug}`);
    }
  };

  return (
    <>
      <div
        onClick={() => handleSubCategoryView(id)}
        className="category_card_content"
      >
        <div className="card">
          <div className="category_card-body">
            {!thumb? (
              <img src={defaultProImg} className="card-img-top" alt="" />
              ) : (
               <img src={categoryBaseUrl + `/${thumb}`} className="card-img-top" alt="" />
              
            )} 
          </div>
          <div className="card-footer">{name}</div>
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
