import React, { useState } from 'react';

const PaymentInfo = () => {
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

  return (
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
      <button type='submit'>purchase</button>
    </div>
  );
};

export default PaymentInfo;