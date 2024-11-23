import React from "react";
import ReactDOM from "react-dom/client"; // Note the "react-dom/client" update for React 18
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HashRouter as Router } from "react-router-dom"; // Use HashRouter instead of BrowserRouter
import { CartProvider } from "./contexts/CartContext";
import { OrderProvider } from "./contexts/OrderContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CartProvider>
      <OrderProvider>
        <Router>
          <App />
          <ToastContainer />
        </Router>
      </OrderProvider>
    </CartProvider>
  </React.StrictMode>
);
