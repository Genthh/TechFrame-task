import React, { useState } from "react";
import "../styles/cart.css";
import CheckoutPage from "./CheckoutPage";

const Cart = ({ cart, setCart }) => {
  const [price, setPrice] = useState(0);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleRemove = (id) => {
    const arr = cart.filter((item) => item.id !== id);
    setCart(arr);
  };

  const handleChange = (item, value) => {
    const newCart = [...cart];
    const index = newCart.findIndex((i) => i.id === item.id);
    if (value === -1 && newCart[index].amount === 1) {
      handleRemove(item.id);
    } else if (value === 1 && newCart[index].amount < 50) {
      newCart[index].amount += 1;
      setCart(newCart);
      setPrice(prevPrice => prevPrice + newCart[index].price);
    } else if (value === 1 && newCart[index].amount >= 50 && newCart[index].price <= 500) {
      alert(`You cannot add more than 50 items of ${item.title}`);
    } else if (value === 1 && newCart[index].amount === 1 && newCart[index].price > 500) {
      alert(`You can only add 1 item of ${item.title} because it costs more than 500 EUR`);
    }
  };
  

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



// import React, { useState } from "react";
// import "../styles/cart.css";
// import CheckoutPage from "./CheckoutPage";

// const Cart = ({ cart, setCart, handleChange }) => {
//   const [shouldRedirect, setShouldRedirect] = useState(false);

//   const handleRemove = (id) => {
//     const arr = cart.filter((item) => item.id !== id);
//     setCart(arr);
//   };
//   const handleChanges = (item, value) => {
//     const newCart = [...cart];
//     const index = newCart.findIndex((i) => i.id === item.id);
//     if (value === -1 && newCart[index].amount === 1) {
//       handleRemove(item.id);
//     } else if (value === 1 && newCart[index].amount < 50) {
//       newCart[index].amount += 1;
//       setCart(newCart);
//     } else if (value === 1 && newCart[index].amount >= 50 && newCart[index].price <= 500) {
//       alert(`You cannot add more than 50 items of ${item.title}`);
//     } else if (value === 1 && newCart[index].amount === 1 && newCart[index].price > 500) {
//       alert(`You can only add 1 item of ${item.title} because it costs more than 500 EUR`);
//     }
//   };  

//   const handleCheckout = () => {
//     // Check if any item has amount greater than 50
//     const hasExceededLimit = cart.some((item) => item.amount > 50);

//     if (hasExceededLimit) {
//       const cartWithinLimit = [];
//       const cartExceedingLimit = [];

//       // Separate items into two arrays based on amount
//       cart.forEach((item) => {
//         if (item.amount <= 50) {
//           cartWithinLimit.push(item);
//         } else {
//           // Create new item with amount <= 50
//           const newItem = {
//             ...item,
//             amount: 50,
//           };
//           cartWithinLimit.push(newItem);

//           // Create new item with remaining amount
//           const remainingAmount = item.amount - 50;
//           const newItemExceedingLimit = {
//             ...item,
//             amount: remainingAmount,
//           };
//           cartExceedingLimit.push(newItemExceedingLimit);
//         }
//       });

//       // Redirect to checkout page with both cart arrays
//       setCart(cartWithinLimit);
//       setShouldRedirect(true);

//       setTimeout(() => {
//         setCart(cartExceedingLimit);
//       }, 1000);
//     } else {
//       setShouldRedirect(true);
//     }
//   };

//   if (shouldRedirect) {
//     return <CheckoutPage cart={cart} />;
//   }

//   const totalPrice = cart.reduce(
//     (acc, item) => acc + item.price * item.amount,
//     0
//   );
//   const VAT = totalPrice <= 500 ? totalPrice * 0.08 : totalPrice * 0.16;

//   return (
//     <article>
//       {cart.map((item) => (
//         <div className="cart_box" key={item.id}>
//           <div className="cart_img">
//             <img src={item.img} alt="" />
//             <p>{item.title}</p>
//           </div>
//           <div>
//             <button onClick={() => handleChange(item, 1)}>+</button>
//             <button>{item.amount}</button>
//             <button onClick={() => handleChange(item, -1)}>-</button>
//           </div>
//           <div>
//             <button onClick={() => handleRemove(item.id)}>Remove</button>
//           </div>
//         </div>
//       ))}
//       <div className="total">
//         <span>Total Price of your Cart</span>
//         <span>{`${totalPrice.toFixed(2)} EUR`}</span>
//       </div>
//       <div className="total">
//         <span>VAT ({totalPrice <= 500 ? "8%" : "16%"})</span>
//         <span>{`${VAT.toFixed(2)} EUR`}</span>
//       </div>
//       <button className="checkout_button" onClick={handleCheckout}>
//         Checkout
//       </button>
//     </article>
//   );
// };

// export default Cart;





// import React, { useState, useEffect } from "react";
// import "../styles/cart.css";
// import CheckoutPage from "./CheckoutPage";

// const Cart = ({ cart, setCart, handleChange }) => {
//   const [price, setPrice] = useState(0);
//   const [shouldRedirect, setShouldRedirect] = useState(false);

//   const handleRemove = (id) => {
//     const arr = cart.filter((item) => item.id !== id);
//     setCart(arr);
//     // handlePrice();
//   };
  
  

//   // useEffect(() => {
//   //   handlePrice();
//   // }, [cart]);

//   const handleCheckout = () => {
//     setShouldRedirect(true);
//   };

//   if (shouldRedirect) {
//     return <CheckoutPage cart={cart} />;
//   }

//   const VAT = price * 0.08;

//   return (
//     <article>
//       {cart.map((item) => (
//         <div className="cart_box" key={item.id}>
//           <div className="cart_img">
//             <img src={item.img} alt="" />
//             <p>{item.title}</p>
//           </div>
//           <div>
//             <button onClick={() => handleChange(item, 1)}>+</button>
//             <button>{item.amount}</button>
//             <button onClick={() => handleChange(item, -1)}>-</button>
//           </div>
//           <div>
//             <button onClick={() => handleRemove(item.id)}>Remove</button>
//           </div>
//         </div>
//       ))}
//       <div className="total">
//         <span>Total Price of your Cart</span>
//         <span>{`${price.toFixed(2)} USD`}</span>
// </div>
// <div className="total">
// <span>VAT (8%)</span>
// <span>{`${VAT.toFixed(2)} USD`}</span>
// </div>
// <button className="checkout_button" onClick={handleCheckout}>
// Checkout
// </button>
// </article>
// );
// };

// export default Cart;