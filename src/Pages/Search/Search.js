import React from "react";
import MetaData from "../Layout/MetaData";
import { useSelector } from "react-redux";
import SearchProductCard from "./SearchProductCard";
import loadingGif from "../../Assets/Images/loading.gif";

const Search = () => {
  const { searchProducts, loading } = useSelector(
    (state) => state?.searchProducts
  );

  return (
    <>
      <MetaData title="Search:- BPPShop" />
      <div className="categoryView-container productView-container">
        <h6>Search result:</h6>
        <br />

        {searchProducts?.products && (
          <div>
            {searchProducts?.products?.length ? (
              <div className="category_content product-content">
                {searchProducts?.products?.map((product) => (
                  <SearchProductCard key={product?.id} product={product} />
                ))}
              </div>
            ) : (
              (loading && (
                <div className="d-flex justify-content-center align-items-center">
                  <img className="mt-5" width={80} src={loadingGif} alt="" />
                </div>
              )) ||
              (!searchProducts.total_size && (
                <h2 className="text-center mt-5">
                  Your search did not match..
                </h2>
              ))
            )}
          </div>
        )}
        
        {searchProducts?.data && (
          <div>
            {searchProducts?.data?.length ? (
              <div className="category_content product-content">
                {searchProducts?.data?.map((product) => (
                  <SearchProductCard key={product?.id} product={product} />
                ))}
              </div>
            ) : (
              (loading && (
                <div className="d-flex justify-content-center align-items-center">
                  <img className="mt-5" width={80} src={loadingGif} alt="" />
                </div>
              )) ||
              (!searchProducts.length && (
                <h2 className="text-center mt-5">
                  Your search did not match..
                </h2>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
