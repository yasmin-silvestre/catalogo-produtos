import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Inicializa o estado buscando do localStorage se existir
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart_loja");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Salva no localStorage toda vez que o carrinho mudar
  useEffect(() => {
    localStorage.setItem("cart_loja", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const itemExists = prevCart.find((item) => item.id === product.id);
      if (itemExists) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id, decreaseOnly = false) => {
    setCart((prevCart) => {
      const item = prevCart.find((i) => i.id === id);
      if (decreaseOnly && item.quantity > 1) {
        return prevCart.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prevCart.filter((i) => i.id !== id);
    });
  };

  const clearCart = () => setCart([]);

  const totalValue = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalValue, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);