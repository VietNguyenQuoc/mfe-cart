import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

class CartElement extends HTMLElement {
  connectedCallback() {
    createRoot(this.attachShadow({ mode: "open" })).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
}

customElements.define("mfe-cart", CartElement);
