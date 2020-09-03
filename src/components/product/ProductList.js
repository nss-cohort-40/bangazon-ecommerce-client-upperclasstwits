import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import "./ProductList.css";

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const { isAuthenticated } = useSimpleAuth();

  const getProducts = () => {
    if (isAuthenticated()) {
      fetch("http://localhost:8000/products", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Token ${localStorage.getItem("bangazon_token")}`,
        },
      })
        .then((res) => res.json())
        .then(setProducts);
    }
  };

  useEffect(getProducts, []);

  return (
    <div className="productList">
      {products.map((product) => (
        <ProductCard key={`product-${product.id}`} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
