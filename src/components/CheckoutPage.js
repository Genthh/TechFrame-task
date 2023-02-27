import React from "react";

const CheckoutPage = ({ cart }) => {
  const totalPrice = cart.reduce((acc, item) => acc + item.amount * item.price, 0);

  return (
    <div>
      <h1>Checkout</h1>
      {cart.map((item) => (
        <div key={item.id}>
          <p>{item.title}</p>
          <p>{item.amount}</p>
          <p>{item.price}€</p>
        </div>
      ))}
      <p>Total: {totalPrice}€</p>
    </div>
  );
};

export default CheckoutPage;
