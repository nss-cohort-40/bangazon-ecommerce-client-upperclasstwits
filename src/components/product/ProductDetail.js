import React, { useEffect, useState } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

const ProductDetail = (props) => {
  const [product, setProduct] = useState({
    customer: {
      user: {
        first_name: "",
      },
    },
  });
  const { isAuthenticated } = useSimpleAuth();
  const [productType, setProductType] = useState({
    name: "",
  });

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
        // product from API
        .then((product) => {
          console.table(product);
          // console.table(customer);
          // THe .product_type has to match what's coming from API
          setProductType(product.product_type);
          setProduct(product);
        });
    }
  };
  const addToCart = () => {
    fetch("http://localhost:8000/products/cart", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("bangazon_token")}`,
      },
      body: JSON.stringify({
        product_id: product.id,
        price: product.price,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        console.log("Added");
        props.history.push("/products/cart");
      });
  };
  useEffect(getProduct, []);

  return (
    <>
      <h1>Title: {product.title} </h1>
      <p>Customer: {product.customer.user.first_name}</p>
      <p>Price: ${product.price}</p>
      <p>Description: {product.description}</p>
      <p>Quantity: {product.quantity} </p>
      <p>Location: {product.location}</p>
      <p>Product Type: {productType.name}</p>
      <button onClick={addToCart}>Add item to cart</button>
    </>
  );
};

export default ProductDetail;
