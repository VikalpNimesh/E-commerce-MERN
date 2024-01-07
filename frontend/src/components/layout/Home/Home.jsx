import React from "react";
// import {} from 'react-icons/all'
import "./Home.css";
import Product from "./ProductCard.jsx";
import { Link } from "react-router-dom";
import { FaArrowDown } from "react-icons/fa";

const product = {
  name: " blue ",
  price: "150",
  _id: "vaibhav",
  images :  "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
};
const Home = () => {
  return (
    <>
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <Link  to="/">
        
          <button><FaArrowDown/></button>
        </Link>
      </div>
      <h2 className="homeHeading">Featured Products</h2>

      <div className="container" id="container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </>
  );
};

export default Home;
