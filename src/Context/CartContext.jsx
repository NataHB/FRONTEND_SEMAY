import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Actualiza el Local Storage cada vez que el carrito cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId, productName, productPrice, quantity) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.productId === productId);

      if (existingProduct) {
        // Si el producto ya está en el carrito, actualizamos la cantidad
        return prevCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      // Si el producto no está en el carrito, lo agregamos
      return [...prevCart, { productId, productName, productPrice, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const getTotal = () => {
    return cart
      .reduce((total, item) => total + item.productPrice * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};
