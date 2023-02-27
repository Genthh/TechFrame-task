import React, { useState, useEffect } from "react";
import "../styles/cart.css";
import CheckoutPage from "./CheckoutPage";

const Cart = ({ cart, setCart, handleChange }) => {
  const [price, setPrice] = useState(0);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleRemove = (id) => {
    const arr = cart.filter((item) => item.id !== id);
    setCart(arr);
    handlePrice();
  };
  
  const handlePrice = () => {
    const governmentRule = {
      maxInvoiceValue: 500,
      maxProductQty: 49,
    };
    let totalPrice = 0;
    let invoiceItems = [];
    let currentQty = 0;
    let currentPrice = 0;
    cart.forEach((item) => {
      if (
        item.price > 500  ||
        (currentQty + item.amount > governmentRule.maxProductQty) ||
        (currentPrice + item.amount * item.price > governmentRule.maxInvoiceValue)
      ) {
        while (item.amount > 0) {
          const maxQty = Math.min(
            Math.floor((governmentRule.maxInvoiceValue - currentPrice) / item.price),
            governmentRule.maxProductQty - currentQty,
            item.amount
          );
          const currentItem = { ...item, amount: maxQty };
          totalPrice += maxQty * currentItem.price;
          invoiceItems.push(currentItem);
          item.amount -= maxQty;
          currentQty += maxQty;
          currentPrice += maxQty * currentItem.price;
          if (
            item.amount === 0 ||
            currentQty === governmentRule.maxProductQty ||
            currentPrice === governmentRule.maxInvoiceValue
          ) {
            setPrice((prevPrice) => prevPrice + totalPrice);
            totalPrice = 0;
            currentQty = 0;
            currentPrice = 0;
          }
        }
      } else {
        totalPrice += item.amount * item.price;
        invoiceItems.push(item);
        currentQty += item.amount;
        currentPrice += item.amount * item.price;
        if (
          currentQty === governmentRule.maxProductQty ||
          currentPrice === governmentRule.maxInvoiceValue
        ) {
          setPrice((prevPrice) => prevPrice + totalPrice);
          totalPrice = 0;
          currentQty = 0;
          currentPrice = 0;
        }
      }
    });
    setPrice(totalPrice);
  };

  useEffect(() => {
    handlePrice();
  }, [cart]);

  const handleCheckout = () => {
    setShouldRedirect(true);
  };

  if (shouldRedirect) {
    return <CheckoutPage cart={cart} />;
  }

  const VAT = price * 0.08;

  return (
    <article>
      {cart.map((item) => (
        <div className="cart_box" key={item.id}>
          <div className="cart_img">
            <img src={item.img} alt="" />
            <p>{item.title}</p>
          </div>
          <div>
            <button onClick={() => handleChange(item, 1)}>+</button>
            <button>{item.amount}</button>
            <button onClick={() => handleChange(item, -1)}>-</button>
          </div>
          <div>
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="total">
        <span>Total Price of your Cart</span>
        <span>{`${price.toFixed(2)} USD`}</span>
</div>
<div className="total">
<span>VAT (8%)</span>
<span>{`${VAT.toFixed(2)} USD`}</span>
</div>
<button className="checkout_button" onClick={handleCheckout}>
Checkout
</button>
</article>
);
};

export default Cart;