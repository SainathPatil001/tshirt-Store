import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });
  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const getFinalPrice = () => {
    let amount = 0;
    products.map((product) => {
      amount = amount + product.price;
    });

    return amount;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) =>{console.log(response)
        const {status}=response
        console.log("STATUS",status)
      cartEmpty()
      })
      .catch((error) => console.log(error));
  };
  const showStripeButton = () => {
    return isAuthenticated() ? (
      getFinalPrice() >= 1 && (
        <StripeCheckoutButton
          stripeKey="pk_test_51IMwW5BwzPMg2waX8UQ53r1gcZLJp9dPJfSNR6CcsB8cUf490Zh8PzqVgjO2AKEQ8pgfOZhaPUJ6XFeVgIihb9ZZ00YV3ljv6h"
          token={makePayment}
          amount={getFinalPrice() * 100}
          name="Buy Tshirts"
          billingAddress
          shippingAddress
        >
          <button className="btn btn-success">Payment with Stripe</button>
        </StripeCheckoutButton>
      )
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin Please</button>
      </Link>
    );
  };
  return (
    <div>
      <h3 className="text-white">Stripe Checkout {getFinalPrice()}Rs</h3>
      <div> {showStripeButton()}</div>
    </div>
  );
};

export default StripeCheckout;
