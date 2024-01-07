import React from "react";
import { Link } from "react-router-dom";
// import Rating from "@material-ui/lab/Rating";

const ProductCard = ({ product }) => {
  const { _id, images, name, ratings, numOfReviews, price } = product;

  const ratingOptions = {
    value: ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link className="productCard" to={`/product/${_id}`}>
      <img  src={images} alt={name} />
      <p>{name}</p>
      <div>
      
        <span className="product-card-span"> ({numOfReviews} Reviews)</span>
      </div>
      <span>{`₹${price}`}</span>
    </Link>
  );
};

export default ProductCard;
