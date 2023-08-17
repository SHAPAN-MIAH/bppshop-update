import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SubSubCategoryCard from "./../../../Components/Cards/SubSubCategoryCard/SubSubCategoryCard";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import MetaData from "./../../Layout/MetaData";
import { useSelector } from "react-redux";

const SubSubCategory = () => {
  const allCategories = useSelector((state) => state.allCategories.categories.data);
  const loading = useSelector((state) => state.allCategories.loading);
  const { slug, subSlug } = useParams();
  const subCategories = allCategories.find((item) => item.slug === slug);
  const subSubCategories = subCategories?.childes?.find(
    (item) => item.slug === subSlug
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !subSubCategories) {
      navigate("/404", { replace: true });
    }
  }, [subSubCategories, loading, navigate]);

  return (
    <>
      <div className="categoryView-section">
        {subSlug === "meat-fish-only-dhaka-city" ? (
          <MetaData
            title="Buy Fresh Meat & Fish online at best price in Dhaka"
            description="Buy Fresh  meat & fish online at best price in Dhaka with Fast Delivery. 
            We collect meat fishes from various sources while ensuring utmost quality and value."
          />
        ) : subSlug === "bread-bakery-dhaka" ? (
          <MetaData
            title="Buy Online Bread & Bakery Products at Low Price"
            description="Buy variety of Bread & Bakery Products at Low Price in bangladesh. 
            Order you bread and bakery products on Bpp Shop with fast home delivery."
          />
        ) : subSlug === "beverages-only-dhaka-city" ? (
          <MetaData
            title="Buy Drinks & Beverage Online From bppShop at Great Prices"
            description="Buy all kind of Drinks & beverages online at Low Price in Dhaka  with Fast Delivery. 
            Get all of your favorite beverages delivered right to your address."
          />
        ) : subSlug === "dairy-eggs-only-dhaka-city" ? (
          <MetaData
            title="Buy Dairy Products & Egg Online at Lowest Prices."
            description="Buy the best quality dairy items & farm fresh egg online at lowest prices in Dhaka. 
            Visit our website to order egg and all types of dairy products. Get Fast Home delivery."
          />
        ) : subSlug === "fruits-vegetables-dhaka" ? (
          <MetaData
            title="Buy  Fresh Fruits & Vegetables Online in Dhaka."
            description="Buy fresh fruits & vegetables online at affordable price in dhaka on bppshop.com.bd
            order fruits and vegetables with fast home delivery."
          />
        ) : subSlug === "baking-only-dhaka-city" ? (
          <MetaData
            title="Buy wide range of baking items in Dhaka."
            description="Buy Baking Items Online in Bangladesh.
            We offer you a wide range of baking supplies product including bakery ingredients at best price. 
            save time, Save money."
          />
        ) : subSlug === "breakfast-only-dhaka-city" ? (
          <MetaData
            title="Buy Breakfast Foods & Products Online in Bangladesh."
            description="Enjoy your morning breakfast with our healthy breakfast items. 
            Order breakfast items online at Low price from BppShop . 
            Fastest Home Delivery."
          />
        ) : subSlug === "candy-chocolate" ? (
          <MetaData
            title="Buy Chocolates & Candies Online in Bangladesh at Best Price."
            description="Buy All Kind Of chocolates & candies online at low price in Bangladesh on bppshop.com.bd with Fast Delivery. 
            customized Chocolate & candy Gift Box available."
          />
        ) : subSlug === "home-cleaning" ? (
          <MetaData
            title="Buy Home And Cleaning Supplies Online | BppShop."
            description="Buy the best quality home & cleaning supplies online at bppshop. 
            Save time and money, and get fast home Delivery."
          />
        ) : subSlug === "personal-care" ? (
          <MetaData
            title="Buy personal care products at reasonable price."
            description="Buy all type of personal care products online at low Prices in bangladesh. 
            shop best quality personal care products from bpp shop. fast home delivery."
          />
        ) : subSlug === "snacks-ice-cream-dhaka" ? (
          <MetaData
            title="Shop Snacks & Ice-Cream Online at Best Prices."
            description="Buy Ice Cream & Snacks Online in Bangladesh.
            We offer you a wide range of Ice Cream & Snacks at best price. 
            save time, Save money."
          />
        ) : subSlug === "stationery" ? (
          <MetaData
            title="Buy biggest selection of Stationery products at reasonable price."
            description="Largest online stationery & Office supplies shop in Dhaka. 
            Buy wide range of Stationery products at Best Price. Cash on delivery."
          />
        ) : subSlug === "molasses-gur" ? (
          <MetaData
            title="Buy pure organic Molasses (gur) online at best price."
            description="Buy fresh pure organic gur online at the low price in Bangladesh. 
            Shop wide variety of brands fresh gur on Bpp Shop online shop."
          />
        ) : subSlug === "cooking" ? (
          <MetaData
            title="Buy Cooking Products Online At  Affordable Price In Bangladesh."
            description="Buy Cooking Items Online in Bangladesh.
            We offer you a wide range of cooking supplies at best price. 
            save time, Save money."
          />
        ) : subSlug === "health-products" ? (
          <MetaData
            title="Buy Health Products Online at Low Prices In Bangladesh | Bppshop."
            description="Buy the best health care products Online at low price in Bangladesh. 
            Shop food supplements, herbal & digestive-aids, first aid, antiseptics. 
            Home Delivery."
          />
        ) : subSlug === "herbal-digestive-aids" ? (
          <MetaData
            title="Buy Herbal & Digestive Aids online at best price."
            description="Buy Herbal & Digestive Aids from a great selection at low price. 
            find the best quality Herbal & Digestive Aid on Bpp Shop."
          />
        ) : subSlug === "oil-spices" ? (
          <MetaData
            title="Buy all kind of cooking oil and spices online at Low Prices."
            description="Buy all types of fresh cooking oil & spices online at lowest prices on Bpp Shop.  
            Shop cooking oli and spices. get home delivery."
          />
        ) : subSlug === "mens" ? (
          <MetaData
            title="Men's Largest Online Clothing Collection in Bd at Best Prices."
            description="Bpp Shop is one of the leading online fashion stor in Bd. 
            Shop wide variety of stylish and affordable clothing for men. jeans pants , panjabi ,T-shirts ,casual outfits, Jackets & More."
          />
        ) : subSlug === "womens" ? (
          <MetaData
            title="Leading Online Women's Fashion Store in BD - Bpp Shop."
            description="Buy wide range of trending & latest Women's dresses, 3-pieces, saree, party-wear, salwar-suit, kurta, top, t-shirt, denim-pants  & More. Cash on Delivery. Shop now."
          />
        ) : subSlug === "kids-boys" ? (
          <MetaData
            title="Buy huge variety of clothing for and kids boys online."
            description="Buy huge variety of clothing for baby boys and kids. Shop latest boys clothing items with panjabi, shirts, pants, polo t-shirt & More from popular brands."
          />
        ) : subSlug === "kids-girls" ? (
          <MetaData
            title="Buy Fashionable Kids Girls clothes online From Bpp Shop."
            description="Get huge collection of latest & high-quality Kids girls clothing online at best price in Bd. Delivering all across Bangladesh."
          />
        ) : subSlug === "fashion-accessories" ? (
          <MetaData
            title="Buy Exclusive Collection Of Fashion Accessories Online."
            description="Buy Wide Range of Men & Women Fashion accessories & Jewelry Online  at the best price from Bpp Shop and get home delivery."
          />
        ) : (
          <MetaData title={`${subSlug} - ${slug}`} />
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
              {subSlug}
            </li>
          </ol>
        </nav>

        <div className="categoryView-container">
          <div className="category_content">
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
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                  <Skeleton height="335px" borderRadius="10px" count={1} />
                </>
              ) : (
                subSubCategories?.childes?.map((SubSubcategory) => (
                  <SubSubCategoryCard
                    key={SubSubcategory.id}
                    SubSubcategory={SubSubcategory}
                  />
                ))
              )}
            </SkeletonTheme>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubSubCategory;
