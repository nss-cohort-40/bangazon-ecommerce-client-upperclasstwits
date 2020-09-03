import React, { useEffect, useState } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

const ProductDetail = (props) => {
  const [product, setProduct] = useState([]);
  const { isAuthenticated } = useSimpleAuth();

  const getProduct = () => {
    if (isAuthenticated()) {
      fetch(`http://localhost:8000/products/${props.productId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Token ${localStorage.getItem("bangazon_token")}`,
        },
      })
        .then((response) => response.json())
        .then((product) => {
          setProduct(product);
        });
    }
  };
  useEffect(getProduct, []);

  return (
    <>
      <h1>Title: {product.title} </h1>
      <p>Customer: {product.customer_id}</p>
      <p>Price: ${product.price}</p>
      <p>Description: {product.description}</p>
      <p>Quantity: {product.quantity} </p>
      <p>Location: {product.location}</p>
      <p>Product Type: {product.product_type_id}</p>
    </>
  );
};

export default ProductDetail;
