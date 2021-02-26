import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";
const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProduct = () => {
    return (
      <div>
        <h2>All Products in cart</h2>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              addToCart={false}
              removeFromCart={true}
              setReload={setReload}
              reload={reload}
            />
          );
        })}
      </div>
    );
  };

  const loadAllCheckout = () => {
    return (
      <div>
        <h2>Checkout Section</h2>
      </div>
    );
  };
  return (
    <Base title="Cart Page" description="Welcome to the Tshirt Store">
      <div className="row text-center">
        <div className="col-6">{loadAllProduct()}</div>
        <div className="col-6"><StripeCheckout
        products={products}
        setReload={setReload}
        /></div>
      </div>
    </Base>
  );
};

export default Cart;
