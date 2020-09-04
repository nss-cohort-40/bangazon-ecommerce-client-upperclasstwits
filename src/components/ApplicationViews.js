import { Route } from "react-router-dom";
import React from "react";
import { withRouter } from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import UserProductList from "./product/UserProductList";
import ProductList from "./product/ProductList";
import ProductForm from "./product/ProductForm";
import ProductDetail from "./product/ProductDetail";
import Cart from "./cart/Cart";

const ApplicationViews = () => {
  return (
    <React.Fragment>
      <Route
        path="/"
        render={(props) => {
          return <></>;
        }}
      />

      <Route
        path="/register"
        render={(props) => {
          return <Register {...props} />;
        }}
      />

      <Route
        path="/login"
        render={(props) => {
          return <Login {...props} />;
        }}
      />

      <Route
        exact
        path="/products"
        render={(props) => {
          return <ProductList {...props} />;
        }}
      />
      <Route
        exact
        path="/products/:productId(\d+)"
        render={(props) => {
          return (
            <ProductDetail
              productId={props.match.params.productId}
              {...props}
            />
          );
        }}
      />
      <Route
        path="/sell-product"
        render={(props) => {
          return <ProductForm {...props} />;
        }}
      />
      <Route
        path="/products/cart"
        render={(props) => {
          return <Cart />;
        }}
      />
    </React.Fragment>
  );
};

export default withRouter(ApplicationViews);
