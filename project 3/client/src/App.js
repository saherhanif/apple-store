import "./App.css";
import Home from "./components/home/home.jsx";
import LoginForm from "./components/login/Login";
import SignUpForm from "./components/sign-up/Sign-up";
import { Routes, Route, BrowserRouter} from "react-router-dom";
import Products from "./components/products/products";
import Navbar from "./components/navbar/navbar";
import Payment from "./components/payment/payment";
import Orders from "./components/orders/orders";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signUp" element={<SignUpForm />} />
          <Route path="/products" element={<Products />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
