import React, { useState, useEffect } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

const PaymentTypeForm = (props) => {
	const [payment, setPayment] = useState({
		merchant_name: "",
		account_number: "",
		expiration_date: "",
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
			payment.expiration_date === ""
		) {
			window.alert("You gotta pay, yo!!!!!");
		} else {
			const thepayment = {
				merchant_name: payment.merchant_name,
				account_number: payment.account_number,
				expiration_date: payment.expiration_date,
			};

			fetch("http://localhost:8000/paymenttype", {
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
					props.history.push("/");
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
						<label htmlFor="expiration_date">Expiration Date</label>
						<input
							type="text"
							required
							onChange={handleFieldChange}
							id="expiration_date"
							placeholder="Expiration Date"
							value={payment.expiration_date}
						/>
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
