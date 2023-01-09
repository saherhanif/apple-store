import React from 'react'
import "./home.css"
import {Link} from 'react-router-dom'
export default function Home() {
 const bestProducts = [{
  "type":"airpods",
  "name": "AirPods Max",
  "model": "AirPodsMax1,1",
  "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaQaRHB3keRetFJJQKlNeGLoTmnsab5IqUzw&usqp=CAU",
  "description":"Introducing AirPods Max — a perfect balance of exhilarating high-fidelity audio and the effortless magic of AirPods. The ultimate personal listening experience is here.",
  "price":"1920"
 },{
    "type":"ipad",
    "name": "iPad Pro (11-inch)",
    "model": "iPad8,3",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAOxf6fCnGxJwM9ACs8yk-eEJ37BFTQekJew&usqp=CAU",
    "description":"The Apple iPad Pro is the largest iPad in Apple's tablet lineup with a 12.9-inch diplay that makes it a perfect tool for productivity. The iPad Pro has tight intergration and support for the Microsoft Office suite and creative Adobe apps, and it comes with two key accessories: the Smart Keyboard that docks to the tablet via a dedicated magnetic connector on the slate, and the new Apple Pencil that supports various levels of pressure that allow you to draw with great precision. These two accessories are sold separately. On its own, the iPad Pro is a powerful tablet featurign the Apple A9X system chip. In terms of design, it keeps the iPad Air styling and is about as lightweight as the original iPad.",
    "price":"3699"
   },{
    "type":"iphone",
    "name": "iPhone 12 Pro Max",
    "model": "iPhone13,4",
   "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5CYElX9v8EO52YTgkiK2W5fHh99NQMW07DQ&usqp=CAU",
   "description":"The iPhone 12 Pro Max has a 6.7-inch screen (slightly larger than the 6.5 on the iPhone 11 Pro Max), and its base price is set at $1,100. It arrives in the same choice of colors: silver, graphite, gold and the new blue option, and it is also offered in the same storage capacities: 128GB, 256GB, and 512GB.",
   "price":"3099"
  }]
  return (
    <div className='main'>
      <section className="hero">
        <div className="intro">
        <h2>Apple store</h2>
        <p>designs, manufactures and markets smartphones, personal computers, tablets, wearables and accessories and sells a range of related services. The Company's products include iPhone, iPad, AirPods, and more.</p>
        <div  className='buttonDiv'>
           <a href='/products'><button>see products</button></a>
          
        </div>
        </div>
      </section>
      <section className='productType'>
          <div className="card homeCard">
            <h3>Iphones</h3>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM3xr7fXvRppMr89vDKcWJKM0x5ZPzTeTUVQ&usqp=CAU" alt="" /><a href="/products">Shop now ..</a></div>
          <div className="card homeCard">
            <h3>Ipads</h3>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAOxf6fCnGxJwM9ACs8yk-eEJ37BFTQekJew&usqp=CAU" alt="" /><a href="/products">Shop now ..</a></div>
          <div className="card homeCard">
            <h3>AirPods</h3>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaQaRHB3keRetFJJQKlNeGLoTmnsab5IqUzw&usqp=CAU" alt="" /><a href="/products">Shop now ..</a></div>
      </section>  
      <div className="randomProducts">
      
        <div className="productCard">
          <img src={bestProducts[0].image} alt=""></img>
         <section>
         <h3>{bestProducts[0].name}</h3>
          <p>{bestProducts[0].description}</p>
         <button><Link to="/products"> see products</Link></button>

         </section>

          </div>
          <div className="productCard">
          <img src={bestProducts[1].image} alt=""></img>
         <section>
         <h3>{bestProducts[1].name}</h3>
          <p>{bestProducts[1].description}</p>
         <button><Link to="/products"> see products</Link></button>

         </section>

          </div>
          <div className="productCard">
          <img src={bestProducts[2].image} alt=""></img>
         <section>
         <h3>{bestProducts[2].name}</h3>
          <p>{bestProducts[2].description}</p>
         <button><Link to="/products"> see products</Link></button>

         </section>

          </div>
         
         
        </div> 
      </div>
  )
}
