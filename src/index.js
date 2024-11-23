// src/index.js

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./contexts/CartContext";
import { OrderProvider } from "./contexts/OrderContext";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CartProvider>
      <OrderProvider>
        <Router>
          <App />
          <ToastContainer /> {/* Ensure ToastContainer is inside Router */}
        </Router>
      </OrderProvider>
    </CartProvider>
  </React.StrictMode>
);
