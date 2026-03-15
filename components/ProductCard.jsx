"use client";

import { FaShoppingCart, FaInfoCircle } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import Link from "next/link";

export default function ProductCard({ product }) {

  const { addToCart, cart } = useCart();

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [error,setError] = useState("");
  const [showDescription,setShowDescription] = useState(false);

  /*
  Calcul stock restant
  */

  const getRemainingStock = (variant) => {

    const itemInCart = cart.find(
      (item) =>
        item.id === product.id &&
        item.size === variant.size
    );

    const qty = itemInCart ? itemInCart.quantity : 0;

    return variant.stock - qty;

  };

  /*
  Ajouter au panier
  */

  const handleAddToCart = () => {

    if(!selectedVariant){

      setError("Veuillez choisir une taille");
      return;

    }

    const remaining = getRemainingStock(selectedVariant);

    if(remaining <= 0){
      return;
    }

    setError("");

    addToCart({

      ...product,
      size:selectedVariant.size,
      stock:selectedVariant.stock

    });

  };

  return (

    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">

      {/* IMAGE CLIQUABLE */}

      <Link href={`/product/${product.id}`}>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-60 object-cover cursor-pointer"
        />

      </Link>

      <div className="p-5">

        {/* NOM + DETAILS */}

        <div className="flex justify-between items-center">

          <Link href={`/product/${product.id}`}>

            <h3 className="text-lg font-bold text-gray-800 hover:text-blue-600 cursor-pointer">
              {product.name}
            </h3>

          </Link>

          <FaInfoCircle
            onClick={()=>setShowDescription(!showDescription)}
            className="text-gray-500 cursor-pointer hover:text-blue-600"
          />

        </div>

        {/* DESCRIPTION */}

        {showDescription && (

          <p className="text-gray-600 text-sm mt-2">
            {product.description}
          </p>

        )}

        {/* PRIX */}

        <p className="text-blue-600 font-bold mt-2">
          {product.price} FCFA
        </p>

        {/* CHOIX VARIANTE */}

        <select
          className="mt-3 w-full border text-black rounded-lg p-2"
          onChange={(e)=>{

            const variant = product.variants.find(
              v => v.size.toString() === e.target.value
            );

            setSelectedVariant(variant);
            setError("");

          }}
        >

          <option value="">Choisir taille</option>

          {product.variants.map((v)=>{

            const remaining = getRemainingStock(v);

            return (
              <option key={v.size} value={v.size}>
                {v.size} (stock : {remaining})
              </option>
            )

          })}

        </select>

        {/* MESSAGE ERREUR */}

        {error && (

          <p className="text-red-500 text-sm mt-2 font-semibold">
            {error}
          </p>

        )}

        {/* STOCK */}

        {selectedVariant && (

          getRemainingStock(selectedVariant) > 0 ?

          <p className="text-green-600 text-sm mt-2">
            Stock restant : {getRemainingStock(selectedVariant)}
          </p>

          :

          <p className="text-red-500 text-sm mt-2 font-semibold">
            Rupture de stock
          </p>

        )}

        {/* BOUTON PANIER */}

        <button

          onClick={handleAddToCart}

          disabled={
            selectedVariant &&
            getRemainingStock(selectedVariant) <= 0
          }

          className={`mt-4 w-full py-2 rounded-lg flex items-center justify-center gap-2 transition
          
          ${
            selectedVariant &&
            getRemainingStock(selectedVariant) <= 0
            ?
            "bg-gray-400 cursor-not-allowed text-white"
            :
            "bg-blue-600 hover:bg-blue-700 text-white"
          }
          
          `}

        >

          <FaShoppingCart/>

          Ajouter au panier

        </button>

      </div>

    </div>

  );
}