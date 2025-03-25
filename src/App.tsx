import { useEffect, useState } from "react";

declare global {
  interface WindowEventMap {
    "mfe-cart:add-to-cart": CustomEvent<{ id: number; name: string }>;
  }
}

function App() {
  const [cart, setCart] = useState([
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
    { id: 3, name: "Product 3" },
  ]);

  const removeProduct = (id: number) => {
    setCart(cart.filter((product) => product.id !== id));
  };

  // Event listener for the custom event
  useEffect(() => {
    const handler = (event: CustomEvent<{ id: number; name: string }>) => {
      setCart((state) => [...state, event.detail]);

      // Emit a custom event to notify the parent app that a product was added to the cart
      window.dispatchEvent(
        new CustomEvent("mfe-cart:product-added", {
          detail: event.detail,
        })
      );
    };

    window.addEventListener("mfe-cart:add-to-cart", handler);

    return () => window.removeEventListener("mfe-cart:add-to-cart", handler);
  }, []);

  return (
    <div>
      <h2>Your cart</h2>
      <ul>
        {cart.map((product) => (
          <li key={product.id}>
            <span>{product.name}</span>
            <button
              style={{ marginLeft: "8px" }}
              onClick={() => removeProduct(product.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
