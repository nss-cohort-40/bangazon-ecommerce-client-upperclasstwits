import React, { useState, useEffect } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
// import "./ProductForm.css";

const ProductForm = (props) => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    quantity: "",
    location: "",
    // image_path: "",
    product_type_id: "",
  });
  const [productTypes, setProductTypes] = useState([]);
  const { isAuthenticated } = useSimpleAuth();

  const getProductTypes = () => {
    if (isAuthenticated()) {
      fetch("http://localhost:8000/producttype", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Token ${localStorage.getItem("bangazon_token")}`,
        },
      })
        .then((response) => response.json())
        .then((allTypes) => {
          setProductTypes(allTypes);
        });
    }
  };

  useEffect(() => {
    getProductTypes();
  }, []);

  const handleFieldChange = (evt) => {
    const stateToChange = { ...product };
    stateToChange[evt.target.id] = evt.target.value;
    setProduct(stateToChange);
  };

  const constructNewProduct = (evt) => {
    evt.preventDefault();

    if (
      product.title === "" ||
      product.price === "" ||
      product.description === "" ||
      product.quantity === "" ||
      product.product_type_id === ""
    ) {
      window.alert(
        "Please complete title, price, description, quantity, and category"
      );
    } else {
      const theProduct = {
        title: product.title,
        price: product.price,
        description: product.description,
        quantity: product.quantity,
        location: product.location,
        // image_path: product.image_path,
        product_type_id: parseInt(product.product_type_id),
      };

      fetch("http://localhost:8000/products", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("bangazon_token")}`,
        },
        body: JSON.stringify(theProduct),
      })
        .then((response) => response.json())
        .then(() => {
          console.log("Added");
          props.history.push("/products");
        });
    }
  };

  return (
    <>
      <form>
        <fieldset>
          <div className="formgrid">
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="title"
              placeholder="Product title"
              value={product.title}
            />
            <label htmlFor="title">Title</label>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="price"
              placeholder="Price"
              value={product.price}
            />
            <label htmlFor="price">Price</label>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="description"
              placeholder="Product Description"
              value={product.description}
            />
            <label htmlFor="description">Description</label>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="quantity"
              placeholder="Quantity"
              value={product.quantity}
            />
            <label htmlFor="quanntity">Quantity Available</label>
            <select
              value={product.product_type_id}
              id="product_type_id"
              onChange={handleFieldChange}
            >
              <option value="">Product Category</option>
              {productTypes.map((productType) => (
                <option key={productType.id} value={productType.id}>
                  {productType.name}
                </option>
              ))}
            </select>
          </div>
          <div className="alignRight">
            <button type="button" onClick={constructNewProduct}>
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default ProductForm;
