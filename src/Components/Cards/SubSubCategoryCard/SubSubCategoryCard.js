import React from "react";
import { useNavigate } from "react-router-dom";
import defaultProImg from "../../../Assets/Images/defaultImg.jpg";
import { categoryBaseUrl } from "../../../BaseUrl/BaseUrl";

const SubSubCategoryCard = ({ SubSubcategory }) => {
  const navigate = useNavigate();
  const { id, name, slug, img, thumb } = SubSubcategory;

  const handleProductView = (id, subSubSlug) => {
    if (id) {
      navigate(subSubSlug);
    }
  };

  return (
    <div
      onClick={() => handleProductView(id, slug)}
      className="category_card_content"
    >
      <div className="card">
        <div className="category_card-body">
        {thumb? <img src={categoryBaseUrl + `/${thumb}`} className="card-img-top" alt="" /> : <img src={defaultProImg} alt=""/>}
        </div>
        <div className="card-footer">{name}</div>
      </div>
    </div>
  );
};

export default SubSubCategoryCard;
