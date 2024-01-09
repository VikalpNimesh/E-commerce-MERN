// import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import {
//   getAllProductsFail,
//   getAllProductsRequest,
//   getAllProductsSuccess,
// } from "../store/slices/productSlice";
// import axios from "axios";

// const UsegetAllProducts = () => {
//   const dispatch = useDispatch();
// //   useEffect(() => {
//     const getAllProduct = async () => {
//       try {
//         dispatch(getAllProductsRequest());
//         const { data } = await axios.get(
//           "http://localhost:4000/api/v1/product"
//         );
//         dispatch(getAllProductsSuccess(data));
//       } catch (error) {
//         dispatch(getAllProductsFail(error.response.data.message));
//       }
//     };

//     getAllProduct(); // Include the function in the dependency array if needed
//   }, [dispatch]);

//   // You might want to return something here if needed
//   // For example, you can return the getAllProduct function
// };

// export default UsegetAllProducts;
