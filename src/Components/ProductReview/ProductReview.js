import React from "react";
import "./ProductReview.css";
import { RatingStar } from "rating-star";

const ProductReview = ({ productDetail }) => {
  const reversedReviews = productDetail?.reviews?.map(
    (_, index, arr) => arr[arr.length - 1 - index]
  );
  return (
    <>
      <div className="review-section">
        <div className="container-fluid reviewSection">
          <div className="row">
            <div className="col-md-6">
              <div className="customer-qa">
                {/* <h2>Customers Q & A</h2> */}
                <h2>Customer Reviews</h2>
                {productDetail?.average_review > 0 ? (
                  <div className="customer_comment_reviews">
                    {reversedReviews?.map((review) => (
                      <div key={review.id} className="review-cart">
                        <div className="users-content">
                          <div className="user-img">
                            <img src="/img/userimg (1).webp" alt="" />
                          </div>
                          <div className="user-qa-header">
                            <div className="d-flex">
                              <p>
                                <i className="bi bi-person"></i>{" "}
                                {review?.customer?.name}
                              </p>
                              <p className="ms-4">
                                <i className="bi bi-clock"></i>{" "}
                                {review?.created_at.slice(0, 10)}
                              </p>
                            </div>
                            <RatingStar
                              id={review?.id}
                              rating={review?.rating}
                              size={14}
                            />
                            {/* <p className="rating-star">
                            {(() => {
                              let userRating = [];
                              for (let i = 1; i <= review.rating; i++) {
                                userRating.push(
                                  <i className="bi bi-star-fill"></i>
                                );
                              }
                              let remaining = 5 - review.rating;
                              for (let i = 1; i <= remaining; i++) {
                                userRating.push(
                                  <i className="bi bi-star-fill last"></i>
                                );
                              }
                              return userRating;
                            })()}
                          </p> */}
                            {/* <button>
                          <i className="bi bi-arrow-90deg-left"></i> Replay
                        </button> */}
                          </div>
                        </div>
                        <small>{review?.comment}</small>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 d-flex justify-content-center">
                    <h5>No Reviews Yet.</h5>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="customer-reviews">
                <h2>Customers Ratings</h2>
                <div className="averageRating-container">
                  <h1>{productDetail?.average_review}</h1>
                  <div>
                    <h2>Average Ratings</h2>
                    <RatingStar
                      id={productDetail?.id}
                      rating={productDetail?.average_review}
                      size={17}
                    />
                    {/* <p className="rating-star">
                      {(() => {
                        let average = Math.floor(productDetail?.average_review);
                        let userRating = [];
                        for (let i = 1; i <= average; i++) {
                          userRating.push(<i className="bi bi-star-fill"></i>);
                        }
                        let remaining = 5 - average;
                        for (let i = 1; i <= remaining; i++) {
                          userRating.push(
                            <i className="bi bi-star-fill last"></i>
                          );
                        }
                        return userRating;
                      })()}
                    </p> */}
                  </div>
                </div>
                <div className="star-progress-container">
                  {(() => {
                    let userReviewTag = [];
                    let reviewCouter = [0, 0, 0, 0, 0];
                    reversedReviews?.map(
                      (review) =>
                        (reviewCouter[parseInt(review?.rating) - 1] += 1)
                    );
                    let reviewPercent = 0;
                    for (let i = 0; i < reviewCouter.length; i++) {
                      reviewPercent =
                        (reviewCouter[i] / productDetail?.reviews_count) * 100;
                      userReviewTag.push(
                        <div className="star-progress">
                          <p>{i + 1} Star </p>
                          <div className="progressbar">
                            <div
                              className="progress"
                              style={{ width: `${reviewPercent}%` }}
                            >
                              <span className="value">
                                {reviewPercent.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return userReviewTag;
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductReview;
