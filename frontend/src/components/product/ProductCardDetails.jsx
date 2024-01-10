import { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import "./ProductDetails.css";
import {
  clearErrors,
  getSingleProductFail,
  getSingleProductSuccess,
} from "../../store/slices/productSlice.js";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader.jsx";
import ReviewCard from "./ReviewCard.jsx";

const ProductCardDetails = () => {
  const { id } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { product, error,loading } = useSelector((state) => state.products);

  const clearError = () => {
    dispatch(clearErrors());
  };

  useEffect(() => {
    const getSingleProduct = async (id) => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/product/${id}`
        );
        dispatch(getSingleProductSuccess(data.product));
        console.log(data);
      } catch (error) {
        dispatch(getSingleProductFail(error.response.data.message));
      }
    };

    if (error) {
      alert.error(error);
      clearError();
    }

    getSingleProduct(id); // Call the API when the component mounts or when id changes

    return () => {
      // Cleanup function to clear errors when the component unmounts
      clearError();
    };
  }, [dispatch, id, error, alert]); // Include id in the dependency array

  // return (
  //   <div>
  //     <div className="ProductDetails">
  //       <div>
  //         <Carousel>
  //           {product.images &&
  //             product.images.map((item, i) => (
  //               <img
  //                 className="CarouselImage"
  //                 key={i}
  //                 src={item.url}
  //                 alt={`${i} Slide`}
  //               />
  //             ))}
  //         </Carousel>
  //       </div>

  //       <div>
  //         <div className="detailsBlock-1">
  //           <h2>{product.name}</h2>
  //           <p>Product # {product._id}</p>
  //         </div>
  //         <div className="detailsBlock-2">
  //           <Rating />
  //           <span className="detailsBlock-2-span">
  //             {" "}
  //             ({product.numOfReviews} Reviews)
  //           </span>
  //         </div>
  //         <div className="detailsBlock-3">
  //           <h1>{`₹${product.price}`}</h1>
  //           <div className="detailsBlock-3-1">
  //             <div className="detailsBlock-3-1-1">
  //               <button>-</button>
  //               <input readOnly type="number" value={1} />
  //               <button>+</button>
  //             </div>
  //             <button disabled={product.Stock < 1 ? true : false}>
  //               Add to Cart
  //             </button>
  //           </div>

  //           <p>
  //             Status:
  //             <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
  //               {product.Stock < 1 ? "OutOfStock" : "InStock"}
  //             </b>
  //           </p>
  //         </div>

  //         <div className="detailsBlock-4">
  //           Description : <p>{product.description}</p>
  //         </div>

  //         <button className="submitReview">Submit Review</button>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                {/* <Rating {...options} /> */}
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input readOnly type="number" value={1} />
                    <button>+</button>
                  </div>
                  <button disabled={product.Stock < 1 ? true : false}>
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button className="submitReview">Submit Review</button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          {/* <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button  color="secondary">
                Cancel
              </Button>
              <Button  color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog> */}

          {product.reviews && product.reviews[0] ?
           (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                   <ReviewCard key={review._id} review={review} /> 
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductCardDetails;

// import { Fragment, useEffect, useState } from "react";
// import Carousel from "react-material-ui-carousel";
// import "./ProductDetails.css";
// import { useSelector, useDispatch } from "react-redux";

// import ReviewCard from "./ReviewCard.jsx";
// import Loader from "../Loader/Loader.jsx";
// import { useAlert } from "react-alert";
// import { useParams, useParams } from "react-router-dom";
// // import MetaData from "../layout/MetaData";
// // import { addItemsToCart } from "../../actions/cartAction";
// // import {
// //   Dialog,
// //   DialogActions,
// //   DialogContent,
// //   DialogTitle,
// //   Button,
// // } from "@material-ui/core";
// // import { Rating } from "@material-ui/lab";
// // import { NEW_REVIEW_RESET } from "../../constants/productConstants";

// const ProductCardDetails = ({ id }) => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const alert = useAlert();

//   const { product, loading, error } = useSelector(
//     (state) => state.productDetails
//   );

//   const { success, error: reviewError } = useSelector(
//     (state) => state.newReview
//   );

//   const options = {
//     size: "large",
//     value: product.ratings,
//     readOnly: true,
//     precision: 0.5,
//   };

//   const [quantity, setQuantity] = useState(1);
//   const [open, setOpen] = useState(false);
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");

//   const increaseQuantity = () => {
//     if (product.Stock <= quantity) return;

//     const qty = quantity + 1;
//     setQuantity(qty);
//   };

//   const decreaseQuantity = () => {
//     if (1 >= quantity) return;

//     const qty = quantity - 1;
//     setQuantity(qty);
//   };

//   const addToCartHandler = () => {
//     dispatch(addItemsToCart(match.params.id, quantity));
//     alert.success("Item Added To Cart");
//   };

//   const submitReviewToggle = () => {
//     open ? setOpen(false) : setOpen(true);
//   };

//   const reviewSubmitHandler = () => {
//     const myForm = new FormData();

//     myForm.set("rating", rating);
//     myForm.set("comment", comment);
//     myForm.set("productId", match.params.id);

//     dispatch(newReview(myForm));

//     setOpen(false);
//   };

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }

//     if (reviewError) {
//       alert.error(reviewError);
//       dispatch(clearErrors());
//     }

//     if (success) {
//       alert.success("Review Submitted Successfully");
//       dispatch({ type: NEW_REVIEW_RESET });
//     }
//     dispatch(getProductDetails(match.params.id));
//   }, [dispatch, match.params.id, error, alert, reviewError, success]);

//   return (
//     <Fragment>
//       {loading ? (
//         <Loader />
//       ) : (
//         <Fragment>

//           <div className="ProductDetails">
//             <div>
//               <Carousel>
//                 {product.images &&
//                   product.images.map((item, i) => (
//                     <img
//                       className="CarouselImage"
//                       key={i}
//                       src={item.url}
//                       alt={`${i} Slide`}
//                     />
//                   ))}
//               </Carousel>
//             </div>

//             <div>
//               <div className="detailsBlock-1">
//                 <h2>{product.name}</h2>
//                 <p>Product # {product._id}</p>
//               </div>
//               <div className="detailsBlock-2">
//                 <Rating {...options} />
//                 <span className="detailsBlock-2-span">
//                   {" "}
//                   ({product.numOfReviews} Reviews)
//                 </span>
//               </div>
//               <div className="detailsBlock-3">
//                 <h1>{`₹${product.price}`}</h1>
//                 <div className="detailsBlock-3-1">
//                   <div className="detailsBlock-3-1-1">
//                     <button onClick={decreaseQuantity}>-</button>
//                     <input readOnly type="number" value={quantity} />
//                     <button onClick={increaseQuantity}>+</button>
//                   </div>
//                   <button
//                     disabled={product.Stock < 1 ? true : false}
//                     onClick={addToCartHandler}
//                   >
//                     Add to Cart
//                   </button>
//                 </div>

//                 <p>
//                   Status:
//                   <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
//                     {product.Stock < 1 ? "OutOfStock" : "InStock"}
//                   </b>
//                 </p>
//               </div>

//               <div className="detailsBlock-4">
//                 Description : <p>{product.description}</p>
//               </div>

//               <button onClick={submitReviewToggle} className="submitReview">
//                 Submit Review
//               </button>
//             </div>
//           </div>

//           <h3 className="reviewsHeading">REVIEWS</h3>

//           <Dialog
//             aria-labelledby="simple-dialog-title"
//             open={open}
//             onClose={submitReviewToggle}
//           >
//             <DialogTitle>Submit Review</DialogTitle>
//             <DialogContent className="submitDialog">
//               <Rating
//                 onChange={(e) => setRating(e.target.value)}
//                 value={rating}
//                 size="large"
//               />

//               <textarea
//                 className="submitDialogTextArea"
//                 cols="30"
//                 rows="5"
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//               ></textarea>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={submitReviewToggle} color="secondary">
//                 Cancel
//               </Button>
//               <Button onClick={reviewSubmitHandler} color="primary">
//                 Submit
//               </Button>
//             </DialogActions>
//           </Dialog>

//           {product.reviews && product.reviews[0] ? (
//             <div className="reviews">
//               {product.reviews &&
//                 product.reviews.map((review) => (
//                   <ReviewCard key={review._id} review={review} />
//                 ))}
//             </div>
//           ) : (
//             <p className="noReviews">No Reviews Yet</p>
//           )}
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };

// export default ProductCardDetails;
