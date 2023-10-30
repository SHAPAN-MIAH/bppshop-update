import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../BaseUrl/BaseUrl";
import NewArrivalSectionProductCard from "./NewArrivalSectionProductCard";
import "./NewArrivalSection.css";

const NewArrivalSection = () => {
  const [newArrivalProduct, setNewArrivalProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseUrl}/products/top?limit=${15}&offset=${1}`)
      .then((response) => {
        response && setLoading(false);
        setNewArrivalProduct(response.data.products);
      });
  }, []);
  return (
    <>
      <div className="new_arrival_section">
        <h4>New Arrival</h4>
        <div className="new_arrival_section_container">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-10">
              <div className="new_arrival_section_product_content">
              {newArrivalProduct?.map((product) => (
                <NewArrivalSectionProductCard
                  key={product?.id}
                  product={product}
                />
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewArrivalSection;
