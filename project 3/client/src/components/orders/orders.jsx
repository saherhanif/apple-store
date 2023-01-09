import React from 'react'
import "./orders.css"

export default function Orders() {
  const [data, setData] = React.useState([]);
   
  const getCart = async () => {
    try {
      let cartInfo = await fetch('/orders', {
        credentials: "include",
      });
      let cartInfojson = await cartInfo.json();
      console.log(cartInfojson);
      setData(cartInfojson);
    } catch (err) {
      console.error(err.message);
    }
    
  };
  React.useEffect(() => {
    getCart();
  }, []);

   let user = window.localStorage.getItem("user").replace(/["]+/g, '')
  

   function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hours = `0${date.getHours()+2}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
   
  //  cardNumber.replace(/\d(?=\d{4})/g, "*"

  return (
    <>
    <h1>Order History</h1>
    <div className="container3">
      
      {data.map((cart) => (
        <div className='order' key={cart.id}>
          <div>
            <div className='userInfo'>
              order by:  {user}<br/>
              <h6>Order Date:  {formatDate(cart.order_date)}<br/></h6> 
              <h6>paymentInfo:  {cart.payment_card_number.replace(/\d(?=\d{4})/g, "*")}<br/></h6>
              <div className='orderTotalPrice'>Total price :  {cart.total_price} NIS</div><br/>
            </div>
          </div>
           <div className='productContainer'>
            {cart.product_ids.map((e) => (
              <div className="productsOrder2" key={e.id}>
                <h4>{e.name}</h4>
                <p>{e.price} NIS</p>
                <img src={e.image} alt=""/>
                <p>Quantity : {e.quantity}</p>
              </div>
            ))}
            </div>
          </div>
      ))}
    </div>
    </>
  );

}
