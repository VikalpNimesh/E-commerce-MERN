import { useEffect } from "react";
import Loader from "../../Loader/Loader.jsx";
import "./Home.css";
import Product from "./ProductCard.jsx";
import { Link } from "react-router-dom";
import { FaArrowDown } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductsRequest,
  getAllProductsSuccess,
  getAllProductsFail,
  clearErrors,
} from "../../../store/slices/productSlice.js";
import { useAlert } from "react-alert";

const Home = () => {
  const clearError = () => {
    dispatch(clearErrors());
  };
  const { products, productCount, error, loading } = useSelector(
    (state) => state.products
  );
  const alert = useAlert();
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      alert.error(error);
      clearError();
    }

    getAllProducts();
  }, [dispatch, error]);

  const getAllProducts = async () => {
    try {
      dispatch(getAllProductsRequest());
      const { data } = await axios.get("http://localhost:4000/api/v1/product");
      // console.log(data);
      dispatch(getAllProductsSuccess(data));
    } catch (error) {
      dispatch(getAllProductsFail(error.response.data.message));
    }
  };

  return (
    <>
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <Link to="/">
          <button>
            <FaArrowDown />
          </button>
        </Link>
      </div>
      <h2 className="homeHeading">Featured Products</h2>

      <div className="container" id="container">
        {loading ? (
          <Loader />
        ) : (
          products.map((product) => (
            <Product key={product._id} product={product} />
          ))
        )}
      </div>
    </>
  );
};

export default Home;
