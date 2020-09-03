import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ProductCard = (props) => {
	return (
		<div className="productCard">
			<div className="productCard-content">
				<div>
					<Link to={detailsLink}>{props.product.title}</Link>
				</div>
				<p>Quantity: {product.quantity}</p>
			</div>
		</div>
	);
};

export default ProductCard;
