import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { baseUrl } from '../../../BaseUrl/BaseUrl';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import AllProductsCard from '../../AllProducts/AllProductsCard';
import downArrow from "../../../Assets/Images/arrow-down.gif.c819a92ab7162c828e944727a545dcd7.gif"


const AllProductSection = () => {
  const [updateAllProduct, setUpdateAllProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${baseUrl}/products/top?limit=${15}&offset=${page}`)
      .then((response) => {
        response && setLoading(false);
        setUpdateAllProduct([...updateAllProduct, ...response.data.products]);
        setHasMore(response.data.products.length > 0);
        setPage(page + 1);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  return (
    <div className='all_product_section mt-4'>
      <h4>Recommend For You</h4>

      <InfiniteScroll
          dataLength={updateAllProduct?.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<h4 style={{textAlign: "center", padding: "10px 0px"}}><img width={60} src={downArrow} alt=""/></h4>}
        >
          <div className="product-container mt-3">
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
                updateAllProduct?.map((product) => (
                  <AllProductsCard key={product?.id} product={product} />
                ))
              )}
            </SkeletonTheme>
          </div>
        </InfiniteScroll>
    </div>
  );
};

export default AllProductSection;