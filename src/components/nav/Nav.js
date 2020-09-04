import React from "react";
import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

const NavBar = (props) => {
  const { isAuthenticated, logout } = useSimpleAuth();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Bangazon</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/sell-product">Sell Product</Link>
        </li>
        <li>
          <Link to="/my-products">My Products</Link>
        </li>
        <li>
          <Link to="/my-profile">Profile</Link>
        </li>
        <li>
          <Link to="/products/cart">Cart</Link>
        </li>
        {isAuthenticated() ? (
          <li className="nav-item">
            <button
              className="nav-link fakeLink"
              onClick={() => {
                logout();
                props.history.push({
                  pathname: "/",
                });
              }}
            >
              Logout
            </button>
          </li>
        ) : (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
