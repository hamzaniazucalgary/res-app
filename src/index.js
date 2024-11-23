import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CartProvider>
      <OrderProvider>
        <Router basename="/res-app">
          <App />
          <ToastContainer />
        </Router>
      </OrderProvider>
    </CartProvider>
  </React.StrictMode>
);
