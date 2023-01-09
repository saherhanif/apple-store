import React from "react";
import { useState } from "react";
import "./products.css";
import Filter from "./filter";

export default function Products() {
  const [list, setList] = React.useState([]); // list of products useState
  const [isDescriptionVisible, setDescriptionVisibility] = useState(false); // if the description is visble or not  useState
  const [activeProductId, setActiveProductId] = useState(null); // productid useState
  const [cart, setCart] = useState([]); //cart usestate
  const [isVisible, setIsVisible] = useState(false); // useState
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 5500,
    type: "all",
  });

  // check if dsecripion is visble and and change its value (toggle button)
  const toggleDescriptionVisibility = (productId) => {
    setActiveProductId(productId);
    setDescriptionVisibility(!isDescriptionVisible);
  };

  // fetch the products from the server thats connected to the data base
  const Data = async () => {
    try {
      let res = await fetch("products");
      let resj = await res.json();
      setList(resj);
    } catch (err) {}
  };
  // use useEffect for the fetched data fetch data
  React.useEffect(() => {
    Data();
    let newCart = JSON.parse(window.localStorage.getItem("cart") || "[]");
    setCart(newCart);
  }, []);

  // to cart and return the quantity of that item
  function addToCart(product) {
    let updated = false;
    const newCart = cart.map((item) => {
      if (item.id === product.id) {
        //if the item exist update the items quantity in the cart
        updated = true;
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    if (!updated) {
      // if the item doesnt exist in the cart push it to the cart and add the quantity with the value 1
      newCart.push({ ...product, quantity: 1 });
    }
    setCart(newCart);
    window.localStorage.setItem("cart", JSON.stringify(newCart)); //save the cart in the local storage so we can use it somewhere else
  }

  function removeFromCart(productId) {
    const newCart = cart.map((item) => {
      // loop over and reduce the matching item quantity by 1
      if (item.id === productId) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(newCart.filter((item) => item.quantity > 0)); //update the setCart with the filtered list of products
    window.localStorage.setItem(
      "cart",
      JSON.stringify(newCart.filter((item) => item.quantity > 0)) //update the cart in the  local storage
    );
  }
  function emptyCart() {
    // if we want to empty the cart we update the setCart to an empty array
    setCart([]);
    window.localStorage.setItem("cart", ""); //update the cart in the  local storage
  }

  let newCart = JSON.parse(window.localStorage.getItem("cart") || "[]");
  //loop on the array to calculate the total price of all the products in the cart
  // let total = cart.reduce(
  //   (acc, product) => acc + +product.price * product.quantity,
  //   0
  // );

  let user = window.localStorage.getItem("user");
  // if (list.length === 0){
  //   list.push ({name:"No Products"})
  // }
  // total = total.toFixed(2);
  // window.localStorage.setItem("total", total);
  // let newTotal = window.localStorage.getItem("total");

  return (
    <div className="products">
      {/* cart */}
      <h1>Our Products</h1>
      {user ? (
        <div className="cart">
          <button className="cartBtn" onClick={() => setIsVisible(!isVisible)}>
            Cart
          </button>{" "}
          {/* on click update the state in of "isvisble" function*/}
          <ul style={{ display: isVisible ? "block" : "none" }}>
            {" "}
            {/* on click check the isVisble state and update the list's style true/false visble list in the cart or hidden */}
            {newCart.map((product) => (
              <li key={product.id}>
                <img src={product.image} alt="rel" />
                <h3>{product.name}</h3>
                <h5>{product.model}</h5>
                <h3>{product.price} NIS</h3>
                <h4>Quantity: {product.quantity}</h4>
                <button
                  className="removeBtn"
                  onClick={() => removeFromCart(product.id)}
                ></button>
              </li>
            ))}
            <h2>
              total :{console.log({ cart })}
              {newCart.reduce((acc, product) => {
                console.log(2, product);
                return acc + +product.price * +product.quantity;
              }, 0).toFixed(2)}{" "}
              NIS
            </h2>
            <button onClick={emptyCart}>empty Cart</button>
            <a href="/payment">
              <button>Move To Payment</button>
            </a>
          </ul>
        </div>
      ) : (
        ""
      )}
      {/* ------- */}
      <div className="filter">
        <Filter filters={filters} setFilters={setFilters} />
      </div>
      {/* products */}
      <div className="container">
        {list.length > 0 ? (
          list
            .filter((product) => +product.price >= +filters.minPrice)
            .filter((product) => +product.price <= +filters.maxPrice)
            .filter(
              (product) =>
                product.type === filters.type || filters.type === "all"
            )
            .map((e) => (
              <div
                key={e.id}
                className={`card ${isDescriptionVisible ? "expanded" : ""}`}
              >
                <div key={e.id}>
                  <div>
                    <br />
                    <br />
                    <img src={e.image} alt="rel" />
                  </div>

                  <div>
                    <br />
                    <h3>{e.name}</h3>
                    <h4>{e.model}</h4>
                    <h4>{e.price} NIS</h4>

                    {user ? (
                      <button
                        onClick={() => {
                          addToCart(e);
                        }}
                      >
                        {" "}
                        Add To Cart +{" "}
                      </button>
                    ) : (
                      ""
                    )}
                    <button
                      onClick={() => {
                        toggleDescriptionVisibility(e.id);
                      }}
                    >
                      {" "}
                      See More{" "}
                    </button>
                    {activeProductId === e.id && isDescriptionVisible && (
                      <div
                        className={`product-description ${
                          isDescriptionVisible ? "visible" : "hidden"
                        }`}
                      >
                        <p>{e.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
        ) : (
          <h1>No products</h1>
        )}
      </div>
    </div>
  );
}
