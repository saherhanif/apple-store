import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import "./navbar.css";

export default function Navbar() {
  
  const storageUser = window.localStorage.getItem("user");
  let username = storageUser.replace(/["]+/g, '');
  
  const logout = ()=>{
    window.localStorage.setItem('user', "");      // reset user key in local storage
  }

  return (
    <>
      <nav className="navbar">
        
        <a href="/">
          <i className="fas fa-home"> Home</i>
        </a>
        <a href="/products">
          <i className="fas fa-shopping-bag"> Products</i>
        </a>
        {!username && (
          <a className="userChange" href="/login">
            <i className="fas fa-sign-in-alt"> Log In</i>
          </a>
        )}
        
        {username && (
          <div className="orderInfo3">
             <a href="/orders" className="orderHistory"><i>Order History</i></a>
             <i className="welcomeUser">Welcome {username} </i>
              <i className="fas fa-shopping-cart"> Cart</i>
           <a className="logout" onClick={logout} href="/login">   
           <i className="fas fa-sign-in-alt"> Log out</i>
          </a>
        
           
          </div>
        )}
      </nav>
    </>
  );
}
