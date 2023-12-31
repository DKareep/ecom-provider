import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ProductsProvider } from "./contexts/ProductsContext/Products";
import { FilterProvider } from "./contexts/FilterContext/Filters";
import { CartProvider } from "./contexts/CartContext/Cart";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ProductsProvider>
    <FilterProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </FilterProvider>
  </ProductsProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
