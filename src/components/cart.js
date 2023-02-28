import React, { useState } from "react";
import "../styles/cart.css";
import CheckoutPage from "./CheckoutPage";

const Cart = ({ cart, setCart }) => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleRemove = (id) => {
    const arr = cart.filter((item) => item.id !== id);
    setCart(arr);
  };

  const handleChange = (item, value) => {
    const newCart = [...cart];
    const index = newCart.findIndex((i) => i.id === item.id);
    const updatedAmount = newCart[index].amount + value;
    const totalPrice = updatedAmount * item.price;

    if (updatedAmount > 50 || totalPrice > 500) {
      return;
    }

    newCart[index].amount = updatedAmount;
    setCart(newCart);
  };

  const handleCheckout = () => {
    const totalPrice = cart.reduce(
      (acc, item) => acc + item.price * item.amount,
      0
    );
    const highPriceProduct = cart.find((item) => item.price > 500);
  
    if (highPriceProduct) {
      setCart([highPriceProduct]);
      setShouldRedirect("single");
      alert(`You can only purchase ${highPriceProduct.name} for ${highPriceProduct.price.toFixed(2)} EUR.`);
    } else if (totalPrice > 500) {
      const cartLessThan500 = cart.filter(
        (item) => item.price * item.amount <= 500
      );
      const cartGreaterThan500 = cart.filter(
        (item) => item.price * item.amount > 500
      );
      setCart(cartLessThan500);
      setShouldRedirect("separate");
      alert(
        `Your order of more than 500 EUR has been split into a separate invoice. Please proceed with the payment of ${cartLessThan500
          .reduce((acc, item) => acc + item.price * item.amount, 0)
          .toFixed(2)} EUR now, and ${cartGreaterThan500
          .reduce((acc, item) => acc + item.price * item.amount, 0)
          .toFixed(2)} EUR later.`
      );
    } else {
      setShouldRedirect(true);
    }
  };
  

  if (shouldRedirect === "separate") {
    const mid = Math.ceil(cart.length / 2); 
    const cart1 = cart.splice(0, mid); 
    const cart2 = cart; 
  
    return (
      <div>
        <CheckoutPage cart={cart1} />
        <CheckoutPage cart={cart2} />
      </div>
    );
  } else if (shouldRedirect) {
    return <CheckoutPage cart={cart} />;
  }
  

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.amount,
    0
  );
  const VAT = totalPrice <= 500 ? totalPrice * 0.08 : totalPrice * 0.16;

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
        <span>{`${totalPrice.toFixed(2)} EUR`}</span>
      </div>
      <div className="total">
        <span>VAT ({totalPrice <= 500 ? "8%" : "16%"})</span>
        <span>{`${VAT.toFixed(2)} EUR`}</span>
      </div>
      <button className="checkout_button" onClick={handleCheckout}>
        Checkout
      </button>
    </article>
  );
};

export default Cart;