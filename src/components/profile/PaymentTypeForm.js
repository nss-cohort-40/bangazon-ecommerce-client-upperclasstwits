import React, { useState, useEffect } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

const PaymentTypeForm = (props) => {
	const [payment, setPayment] = useState({
		merchant_name: "",
		account_number: "",
		created_date: "",
		customer_id: "",
		experiation_date: "",
		paymenttypeId: "",
	});
	const [paymentTypes, setPaymentTypes] = useState([]);
	const { isAuthenticated } = useSimpleAuth();

	const getpaymentTypes = () => {
		if (isAuthenticated()) {
			fetch("http://localhost:8000/paymenttype", {
				method: "GET",
				headers: {
					Accept: "application/json",
					Authorization: `Token ${localStorage.getItem("bangazon_token")}`,
				},
			})
				.then((response) => response.json())
				.then((allTypes) => {
					setPaymentTypes(allTypes);
				});
		}
	};

	useEffect(() => {
		getpaymentTypes();
	}, []);

	const handleFieldChange = (evt) => {
		const stateToChange = { ...payment };
		stateToChange[evt.target.id] = evt.target.value;
		setPayment(stateToChange);
	};

	const constructNewpayment = (evt) => {
		evt.preventDefault();

		if (
			payment.merchant_name === "" ||
			payment.account_number === "" ||
			payment.created_date === "" ||
			payment.customer_id === "" ||
			payment.experiation_date === "" ||
			payment.paymenttypeId === ""
		) {
			window.alert("You gotta pay, yo!!!!!");
		} else {
			const thepayment = {
				merchant_name: payment.merchant_name,
				account_number: payment.account_number,
				customer_id: payment.customer_id,
				experiation_date: payment.experiation_date,
				paymenttypeId: parseInt(payment.paymenttypeId),
			};

			fetch("http://localhost:8000/payments", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("bangazon_token")}`,
				},
				body: JSON.stringify(thepayment),
			})
				.then((response) => response.json())
				.then(() => {
					console.log("Added");
					props.history.push("/payments");
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
							id="merchant_name"
							placeholder="Merchant Name"
							value={payment.merchant_name}
						/>
						<label htmlFor="account_number">Account Number</label>
						<input
							type="interger"
							required
							onChange={handleFieldChange}
							id="account_number"
							placeholder="Account Number"
							value={payment.account_number}
						/>
						<label htmlFor="Created Date">Price</label>
						<input
							type="text"
							required
							onChange={handleFieldChange}
							id="description"
							placeholder="payment Description"
							value={payment.description}
						/>
						<label htmlFor="description">Description</label>
						<input
							type="text"
							required
							onChange={handleFieldChange}
							id="quantity"
							placeholder="Quantity"
							value={payment.quantity}
						/>
						<label htmlFor="quanntity">Quantity Available</label>
						<select
							value={payment.paymentTypeId}
							id="paymentTypeId"
							onChange={handleFieldChange}
						>
							<option value="">payment Category</option>
							{paymentTypes.map((paymentType) => (
								<option key={paymentType.id} value={paymentType.id}>
									{paymentType.name}
								</option>
							))}
						</select>
					</div>
					<div className="alignRight">
						<button type="button" onClick={constructNewpayment}>
							Submit
						</button>
					</div>
				</fieldset>
			</form>
		</>
	);
};

export default PaymentTypeForm;
