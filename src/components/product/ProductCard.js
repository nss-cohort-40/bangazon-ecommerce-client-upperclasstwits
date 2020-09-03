import React from "react";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  return (
    <div className="productCard">
      <div className="productCard-content">
        <div>
          <Link to={`/products/${props.product.id}`}>
            {props.product.title}
          </Link>
        </div>
        <p>Quantity: {props.product.quantity}</p>
      </div>
    </div>
  );
};

export default ProductCard;
