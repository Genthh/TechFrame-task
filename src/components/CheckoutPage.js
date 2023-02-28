import React from "react";
import "../styles/Checkout.css";

const CheckoutPage = ({ cart }) => {
  const totalPrice = cart.reduce((acc, item) => acc + item.amount * item.price, 0);
  const VAT = totalPrice * 0.08;
  let discount = 0;
  let VATRate = 0.08;
  let totalWithVAT = totalPrice + VAT;

  if (totalWithVAT > 500) {
    discount = totalWithVAT * 0.1;
    totalWithVAT = totalWithVAT - discount;
    VATRate = 0.16;
  }

  return (
    <div className="invoice">
      <h1>Invoice</h1>
      <div className="total">
      </div>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Discount</th>
            <th>Price</th>
            <th>VAT</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.amount}</td>
              <td>{discount.toFixed(2)}%</td> 
              <td>{item.price.toFixed(2)}€</td>
              <td>({(VATRate * 100).toFixed(0)}%)</td>
              <td>{(item.amount * item.price + VAT).toFixed(2)}€</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CheckoutPage;
