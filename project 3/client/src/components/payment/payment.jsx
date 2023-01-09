import React from 'react'
import "./payment.css"
import  { useState } from 'react';


export default function Payment() {
  const [name, setName] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [date, setDate] = useState('');
  const [cvv, setCvv] = useState('');
  
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'name') {
      setName(value);
    } 
   else if (name === 'creditCard') {
      setCreditCard(value);
    }else if (name === 'expireDate') {
      setDate(value);
    }else if (name === 'cvv') {
      setCvv(value);
    }
  };
  
  const handleSubmit = () => {
    let userId = window.localStorage.getItem('user')
    userId = userId.replace(/["]+/g, '');
    
    const data = {
      user_id: userId, 
      products: newCart, 
      total_price: total,
      order_date: new Date().toISOString(), 
      payment_card_number: creditCard 
    };

    fetch('/payment', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        window.location.href="/orders"
      });
  };

  let newCart = JSON.parse(window.localStorage.getItem("cart") || "[]");
  let total = newCart.reduce((acc, product) => acc +  +product.price * product.quantity, 0); //loop on the array to calculate the total price of all the products in the cart
  total = total.toFixed(2) 
  
  return (
    <div>
      <h1>Payment</h1>
      <div className='container2'>
        <div className="paymentCart">
             {/* on click update the state in of "isvisble" function*/ }
          <ul >  {/* on click check the isVisble state and update the list's style true/false visble list in the cart or hidden */}
            {newCart.map(product => (   
              <li key={product.id}>
                <button className="paymentRemoveBtn"></button>
                <img src={product.image} alt="rel" />
                <h3>{product.name}</h3>
                <h5>{product.model}</h5>
                <h3>{product.price} NIS</h3>
                <h4>Quantity: {product.quantity}</h4>
              </li>
            ))}
            <h2>total : {total} NIS</h2>
</ul>
</div>
<div className='paymentContainer'>
  <img src="https://n1gloves.com/img/cms/pagos_1.png" alt="" width="350" height="50"/>
  <h3>Payment Information</h3>
  <label htmlFor="name">Name: </label>
  <input type="text" id="name" name="name" value={name} onChange={handleChange} />
  <br />
  <br />
  <label htmlFor="creditCard">Credit Card: </label>
  <input type="tel" putmode="numeric" pattern="[0-9\s]{13,19}" id="creditCard" name="creditCard" autocomplete="cc-number" maxlength="19" placeholder="xxxx xxxx xxxx xxxx" value={creditCard} onChange={handleChange} />
  <br />
  <br />
  <label htmlFor="expireDate">Expire Date:</label>
  <input type="text" id="expireDate" name="expireDate" placeholder="MM/YY" size="6" value={date} onChange={handleChange} minlength="5" maxlength="5"/>
  <label htmlFor="cvv">cvv:</label>
  <input type="password" id="cvv" name="cvv" value={cvv} onChange={handleChange} placeholder="000" size="1" minlength="3" maxlength="3"/>
  <br/>
  <button type='button' onClick={handleSubmit}>purchase</button>
</div>
</div>
</div>
  )
}
