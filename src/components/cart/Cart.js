import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Cart = (props) => {
  // Create a state variable for Cart items - useState()
  const [cartList, setCartList] = useState([]);

  const getItems = () => {
    // Fetch the data from localhost:8000/itineraryitems
    fetch("http://localhost:8000/products/cart", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("bangazon_token")}`,
      },
    })
      // Convert to JSON
      .then((response) => response.json())

      // Store itinerary items in state variable
      .then((allTheItems) => {
        // console.table(allTheItems);
        setCartList(allTheItems);
      });
  };
  useEffect(getItems, []);

  // Create HTML representation with JSX
  return (
    <>
      <h2>My Cart</h2>
      <Link to={`/products`}>
        <button>Back to All Products</button>
      </Link>
      <div>
        {cartList.map((item) => {
          return (
            <div>
              {item.title} price: ${item.price}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Cart;
