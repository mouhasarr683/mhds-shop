"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

  const [cart, setCart] = useState([]);

  const [errorItem, setErrorItem] = useState(null);

  /*
  Ajouter au panier
  */

  const addToCart = (product) => {

    const existingItem = cart.find(
      (item) =>
        item.id === product.id &&
        item.size === product.size
    );

    if (existingItem) {

      if (existingItem.quantity >= product.stock) {

        setErrorItem(product.id + "-" + product.size);
        return;

      }

      setErrorItem(null);

      setCart(
        cart.map((item) =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );

    } else {

      setCart([
        ...cart,
        { ...product, quantity: 1 }
      ]);

    }

  };

  /*
  Augmenter quantité
  */

  const increaseQty = (id, size) => {

    const item = cart.find(
      (p) => p.id === id && p.size === size
    );

    if (item.quantity >= item.stock) {

      setErrorItem(id + "-" + size);
      return;

    }

    setErrorItem(null);

    setCart(

      cart.map((item) =>

        item.id === id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item

      )

    );

  };

  /*
  Diminuer quantité
  */

  const decreaseQty = (id, size) => {

    setErrorItem(null);

    setCart(

      cart
        .map((item) =>

          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item

        )
        .filter((item) => item.quantity > 0)

    );

  };

  /*
  Calcul nombre produits
  */

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        cartCount,
        errorItem
      }}
    >

      {children}

    </CartContext.Provider>

  );

}

export const useCart = () => useContext(CartContext);