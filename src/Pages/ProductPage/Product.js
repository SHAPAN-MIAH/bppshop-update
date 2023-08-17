import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../../Components/Cards/ProductCard/ProductCard";
import "./Product.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { baseUrl } from "../../BaseUrl/BaseUrl";
import MetaData from "./../Layout/MetaData";
import { useSelector } from "react-redux";

const Product = () => {
  const allCategories = useSelector((state) => state.allCategories.categories.data);
  const isLoading = useSelector((state) => state.allCategories.loading);

  
  const { slug, subSlug, subSubSlug } = useParams();
  const navigate = useNavigate();
  const categories = allCategories?.find((item) => item?.slug === slug);
  const subCategories = categories?.childes?.find(
    (item) => item?.slug === subSlug
  );
  const subSubCategories = subCategories?.childes?.find(
    (item) => item.slug === subSubSlug
  );

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseUrl}/categories/products/${subSubCategories?.id}`)
      .then((res) => {
        setProducts(res.data.data);
        setLoading(false);
      });
  }, [subSubCategories?.id]);

  // useEffect(() => {
  //   if (!isLoading && !subSubCategories) {
  //     navigate("/404", { replace: true });
  //   }
  // }, [subSubCategories, isLoading, navigate]);

  return (
    <div className="categoryView-section productView-section">
      {subSubSlug === "beef" ? (
        <MetaData
          title="Buy online Fresh Meat at Low Price in Bangladesh."
          description="Order Fresh & best quality Beef online at reasonable price in dhaka. buy premium quality Beef from Bpp Shop and get fast home delivery."
        />
      ) : subSubSlug === "mutton" ? (
        <MetaData
          title="Buy Ready To Cook Fresh Mutton online at Low Price in Bd."
          description="Order Fresh Mutton online at reasonable price in dhaka. buy premium quality Ready To Cook Mutton from Bpp Shop and get fast home delivery."
        />
      ) : subSubSlug === "duck-chicken" ? (
        <MetaData
          title="Buy Ready To Cook Fresh Duck & Chicken online at Low Price in Bd."
          description="Order  Fresh Duck & chicken online at reasonable price in dhaka. buy premium quality Ready To Cook Duck & Chicken  from Bpp Shop and get fast home delivery."
        />
      ) : subSubSlug === "fish" ? (
        <MetaData
          title="Buy Fresh Fish online at best price in Dhaka City."
          description="Buy Fresh fish online at best price in Dhaka with Fast Delivery. 
          We collect fishes from various sources while ensuring utmost quality and value."
        />
      ) : subSubSlug === "dried-fish" ? (
        <MetaData
          title="Order Organic Dried Fish Online at Low Price in Bangladesh."
          description="Buy premium quality dried fish (sutki) in bangladesh at low price. order various kinds of dried fish from Bpp Shop. fast Home delivery."
        />
      ) : subSubSlug === "tofu-meat-alternatives" ? (
        <MetaData
          title="Buy Tofu & Meat Alternatives Products Online  Low Price."
          description="Buy different kind of fresh and good quality Tofu & Meat Alternatives food at lowest prices in bangladesh. order Tofu & Meat Alternatives from Bpp Shop. fast home delivery."
        />
      ) : subSubSlug === "breads" ? (
        <MetaData
          title="Buy Online Breads Products at Low Price."
          description="Buy variety of Bread & Bakery Products at Low Price in bangladesh. 
          Order you bread and bakery products on Bpp Shop with fast home delivery."
        />
      ) : subSubSlug === "biscuits" ? (
        <MetaData
          title="Buy Biscuits Online at Lowest Prices in Bangladesh."
          description="Buy wide range of biscuits online from Bp Shop. 
          Shop your favorite Biscuits at Lowest Prices in Bangladesh. Get fastest home delivery."
        />
      ) : subSubSlug === "cookies" ? (
        <MetaData
          title="Buy Cookies Online at Lowest Prices in Bangladesh."
          description="Buy wide range of cookies online from Bp Shop. 
          Shop your favorite cookies at Lowest Prices in Bangladesh. Get fastest home delivery."
        />
      ) : subSubSlug === "bakery-snacks" ? (
        <MetaData
          title="Buy Online Bakery & Snacks Products at Low Price."
          description="Buy variety of Bakery & Snacks Products at Low Price in bangladesh. 
          Order you bakery & Snacks products on Bpp Shop with fast home delivery."
        />
      ) : subSubSlug === "cakes" ? (
        <MetaData
          title="Buy Cake Online at Lowest Prices in Bangladesh."
          description="Buy Cake Online at Lowest Prices on Bpp Shop in Bangladesh.  
          Bpp Shop offer all types of fresh delicious cakes. fast home delivery."
        />
      ) : subSubSlug === "dips-spreads" ? (
        <MetaData
          title="Buy Dips & Spreads Products online at Low Prices."
          description="Buy dips & spreads product online in bangladesh at lowest price.
          Order wide range of dips & spreads products On Bpp Shop. Fast Home Delivery."
        />
      ) : subSubSlug === "water" ? (
        <MetaData
          title="Buy Mineral Water at Low Price In Bangladesh."
          description="Order Fresh snd top quality Mineral Water online at lowest prices in bangladesh on Bpp Shop. buy different size's Healthy & purified drinking water.quick delivery."
        />
      ) : subSubSlug === "soft-drinks" ? (
        <MetaData
          title="Buy Soft Drinks Online at Lowest Price in Bangladesh."
          description="Buy different kind of fresh and good quality soft drinks at lowest prices in bangladesh. order non-alcoholic refreshing soft drinks from Bpp Shop. fast home delivery."
        />
      ) : subSubSlug === "tea" ? (
        <MetaData
          title="Buy Tea Online in Bangladesh at Best Price from Bpp Shop."
          description="Buy organic Tea at low price In Bangladesh. Bpp Shop Provide the best quality organic tea. Buy Green Tea, Black Tea, Herbal Tea, Masala Tea, Chamomile Tea and Tea Bags."
        />
      ) : subSubSlug === "coffee" ? (
        <MetaData
          title="Order Coffee Online in Bangladesh at Low Prices."
          description="Buy huge collection of coffee from top brand at reasonable price. order best quality coffee beans online in bangladesh. Fastest home delivery."
        />
      ) : subSubSlug === "juice" ? (
        <MetaData
          title="Buy Juices Online at Low Price in Bangladesh."
          description="Buy ALL kind of Fresh & Genuine Juice online at low price in bangladesh on Bpp Shop. online juice shopping in Bangladesh with fast home delivery."
        />
      ) : subSubSlug === "syrups-powder-drinks" ? (
        <MetaData
          title="Buy Syrup & Power Drinks at Low Price Online in Bd."
          description="All kind of original & quality full syrups & powder Drinks available on Bpp Shop. Buy Syrup & Powder Drinks at lowest price in bangladesh. fast home delivery."
        />
      ) : (
        <MetaData title={`${subSubSlug}-${subSlug}-${slug}`} />
      )}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb my-4">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            <Link to={`/${slug}`}>{slug}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={`/${slug}/${subSlug}`}>{subSlug}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {subSubSlug}
          </li>
        </ol>
      </nav>

      <div className="categoryView-container productView-container">
        {/* {products?.length ? ( */}

        <div className="category_content product-content">
          <SkeletonTheme baseColor="#DDDDDD" highlightColor="#e3e3e3">
            {loading ? (
              <>
                <Skeleton height="335px" borderRadius="10px" count={1} />
                <Skeleton height="335px" borderRadius="10px" count={1} />
                <Skeleton height="335px" borderRadius="10px" count={1} />
                <Skeleton height="335px" borderRadius="10px" count={1} />
                <Skeleton height="335px" borderRadius="10px" count={1} />
                <Skeleton height="335px" borderRadius="10px" count={1} />
                <Skeleton height="335px" borderRadius="10px" count={1} />
                <Skeleton height="335px" borderRadius="10px" count={1} />
                <Skeleton height="335px" borderRadius="10px" count={1} />
                <Skeleton height="335px" borderRadius="10px" count={1} />
              </>
            ) : (
              products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
              // : !loading && (
              //   <div className="d-flex justify-content-center align-items-center">
              //     <h2 className="text-warning mt-5">Products will coming soon.</h2>
              //   </div>
              // )
            )}
          </SkeletonTheme>
        </div>
        {/* ) : (
          !loading && (
            <div className="d-flex justify-content-center align-items-center">
              <h2 className="text-warning mt-5">Products will coming soon.</h2>
            </div>
          )
        )} */}
      </div>
    </div>
  );
};

export default Product;
