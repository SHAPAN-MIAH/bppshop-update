import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import ProductCard from "../../../Components/Cards/ProductCard/ProductCard";
import { baseUrl } from "../../../BaseUrl/BaseUrl";
import InfiniteScroll from "react-infinite-scroll-component";
import downArrow from "../../../Assets/Images/arrow-down.gif.c819a92ab7162c828e944727a545dcd7.gif"


const AllSubCategoryProduct = () => {
  const allCategories = useSelector(
    (state) => state.allCategories.categories.data
  );

  const { slug, subSlug } = useParams();
  const categories = allCategories?.find((item) => item?.slug == slug);
  const subCategories = categories?.childes?.find(
    (item) => item?.slug == subSlug
  );
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const listInnerRef = useRef();
  // const [currPage, setCurrPage] = useState(1);
  // const [prevPage, setPrevPage] = useState(0);
  // const [lastList, setLastList] = useState(false);

  // useEffect(() => {
  //   let limit = 15;
  //   const fetchData = async () => {
  //     const response = await axios.get(
  //       `${baseUrl}/categories/products/${subCategories?.id}?limit=${limit}&offset=${currPage}`
  //     );

  //     response && setLoading(false);
  //     if (!response.data.data.length) {
  //       setLastList(true);
  //       return;
  //     }
  //     setPrevPage(currPage);
  //     setProducts([...products, ...response.data.data]);
  //   };
  //   if (!lastList && prevPage !== currPage) {
  //     fetchData();
  //   }
  // }, [currPage, lastList, prevPage, products, subCategories?.id]);

  // const onScroll = () => {
  //   if (listInnerRef.current) {
  //     const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
  //     if (scrollTop + clientHeight === scrollHeight) {
  //       setCurrPage(currPage + 1);
  //     }
  //   }
  // };
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
    fetchData(1);
  }, [subCategories?.id]);

  const fetchData = (p = page) => {
    axios
      .get(
        `${baseUrl}/categories/products/${
          subCategories?.id
        }?limit=${15}&offset=${p}`
      )
      .then((response) => {
        response && setLoading(false);
        if (p == 1) {
          setProducts(response?.data?.data);
        } else {
          setProducts([...products, ...response?.data?.data]);
        }
        setHasMore(response?.data?.data.length > 0);
        setPage(page + 1);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <>
      <div className="categoryView-section productView-section">
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
              All {subCategories?.name}
            </li>
          </ol>
        </nav>

        <div className="categoryView-container productView-container">
          <InfiniteScroll
            dataLength={products?.length}
            next={fetchData}
            hasMore={hasMore}
            loader={
              <h4 style={{ textAlign: "center", padding: "10px 0px" }}>
                 <img width={60} src={downArrow} alt=""/>
              </h4>
            }
          >
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
                    <Skeleton height="335px" borderRadius="10px" count={1} />
                    <Skeleton height="335px" borderRadius="10px" count={1} />
                    <Skeleton height="335px" borderRadius="10px" count={1} />
                    <Skeleton height="335px" borderRadius="10px" count={1} />
                    <Skeleton height="335px" borderRadius="10px" count={1} />
                  </>
                ) : (
                  products?.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      allSubCategoryProductCard={true}
                    />
                  ))
                )}
              </SkeletonTheme>
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

export default AllSubCategoryProduct;
