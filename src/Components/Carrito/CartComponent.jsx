import React, { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { HiOutlineShoppingCart } from "react-icons/hi";
import "../Navbar/Navbar.css";

const CartComponent = ({ toggleDropdown, openDropdown }) => {
  const { cart, removeFromCart, updateQuantity, getTotal } = useContext(CartContext);

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const generateWhatsAppLink = () => {
    const number = "5491131985188"; // Reemplazá por el número de WhatsApp al que querés enviar el mensaje.
    const cartDetails = cart
      .map(
        (item) =>
          `Producto: ${item.productName}, Precio: $${item.productPrice}, Cantidad: ${item.quantity}, Subtotal: $${(item.quantity * item.productPrice).toFixed(2)}`
      )
      .join("\n");
    const total = getTotal();
    const message = `Hola, quiero comprar los siguientes productos:\n\n${cartDetails}\n\nTotal: $${total}`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${number}?text=${encodedMessage}`;
  };

  return (
    <>
      <h4 onClick={() => toggleDropdown("carrito")} style={{ fontSize: "20px" }}>
        <HiOutlineShoppingCart />
      </h4>
      {cart.length === 0 ? (
        <ul className={`dropdown-menu ${openDropdown === "carrito" ? "open" : ""}`}>
          <li>No hay productos en el carrito</li>
        </ul>
      ) : (
        <ul className={`dropdown-menu ${openDropdown === "carrito" ? "open" : ""}`}>
          {cart.map((item) => (
            <li key={item.productId}>
              <p>{item.productName} ${item.productPrice}</p>
              <p>Cantidad: {item.quantity}</p>
              <p>Subtotal: ${(item.quantity * item.productPrice).toFixed(2)}</p>
              <div style={{ display: "flex", gap: "5px" }}>
                <button onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}>+</button>
                <button onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}>-</button>
                <button onClick={() => handleRemove(item.productId)}>Eliminar</button>
              </div>
            </li>
          ))}
          <div style={{ padding: "15px" }}>
            <p>Total: ${getTotal()}</p>
            <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer">
              <button>Comprar</button>
            </a>
          </div>
        </ul>
      )}
    </>
  );
};

export default CartComponent;
