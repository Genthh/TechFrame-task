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
    // totalWithVAT = totalWithVAT - discount;
    VATRate = 0.16;
  }

  function handlePrintClick() {
    window.print();
  }

  const total = cart.reduce((accumulator, item) => accumulator + (item.amount * item.price + VAT), 0);
  const subtotal = cart.reduce((accumulator, item) => accumulator + (item.amount * item.price), 0);
  const VATAmount = total - subtotal;
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
              <td>0%</td> 
              <td>{item.price.toFixed(2)}€</td>
              <td>({(VATRate * 100).toFixed(0)}%)</td>
              <td>{(item.amount * item.price + VAT).toFixed(2)}€</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="5" style={{ textAlign: "right" }}>Subtotal:</td>
            <td>{subtotal.toFixed(2)}€</td>
            </tr>
            <tr>
            <td  colSpan="5" style={{ textAlign: "right" }}>VAT:</td>
            <td>{VATAmount.toFixed(2)}€</td>
            </tr>
            <tr>
            <td colSpan="5" style={{ textAlign: "right" }}>Total:</td>
            <td>{total.toFixed(2)}€</td>
          </tr>
        </tfoot>
      </table> 
      <div className="print">
        <button className="print-button" onClick={handlePrintClick}>Print the invoice</button>
      </div>
    </div>
  );
};

export default CheckoutPage;
