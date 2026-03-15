"use client";

import { FaShoppingCart, FaInfoCircle } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import Link from "next/link";

export default function ProductCard({ product }) {

  const { addToCart, cart } = useCart();

  const [selectedVariant,setSelectedVariant] = useState(null);
  const [error,setError] = useState("");
  const [showDescription,setShowDescription] = useState(false);

  const getRemainingStock = (variant)=>{

    const item = cart.find(
      i=> i._id === product._id && i.size === variant.size
    );

    const qty = item ? item.quantity : 0;

    return variant.stock - qty;

  };

  const totalStock = product.variants.reduce(
    (total,v)=> total + getRemainingStock(v),
    0
  );

  const handleAddToCart = ()=>{

    if(!selectedVariant){
      setError("Veuillez choisir une taille");
      return;
    }

    const remaining = getRemainingStock(selectedVariant);

    if(remaining <= 0){
      setError("Rupture de stock");
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

    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">

      {/* IMAGE */}

      <Link href={`/product/${product._id}`}>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 md:h-60 object-cover"
        />

      </Link>

      <div className="p-4 md:p-5">

        {/* NOM + INFO */}

        <div className="flex justify-between items-center">

          <Link href={`/product/${product._id}`}>

            <h3 className="text-base md:text-lg font-bold text-gray-800 hover:text-blue-600">
              {product.name}
            </h3>

          </Link>

          <FaInfoCircle
            onClick={()=>setShowDescription(!showDescription)}
            className="text-gray-500 cursor-pointer hover:text-blue-600"
          />

        </div>

        {/* STOCK GLOBAL */}

        <p className={`text-sm mt-1 font-semibold ${
          totalStock === 0 ? "text-red-500" : "text-green-600"
        }`}>

          {totalStock === 0
            ? "Rupture de stock"
            : `Stock restant : ${totalStock}`
          }

        </p>

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

        {/* VARIANTS */}

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

            return(

              <option key={v.size} value={v.size}>
                {v.size} (stock : {remaining})
              </option>

            )

          })}

        </select>

        {/* ERREUR */}

        {error && (

          <p className="text-red-500 text-sm mt-2">
            {error}
          </p>

        )}

        {/* BOUTON */}

        <button

          onClick={handleAddToCart}

          disabled={
            selectedVariant &&
            getRemainingStock(selectedVariant) <= 0
          }

          className="mt-4 w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 transition disabled:bg-gray-400"

        >

          <FaShoppingCart/>

          Ajouter au panier

        </button>

      </div>

    </div>

  );

}