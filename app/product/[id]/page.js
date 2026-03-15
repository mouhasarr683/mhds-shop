"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Navbar from "../../../components/Navbar";
import { useCart } from "../../../context/CartContext";
import products from "../../../data/products";

export default function ProductPage(){

  const { id } = useParams();

  const product = products.find(
    (p)=>p.id.toString() === id
  );

  const { addToCart, cart } = useCart();

  const [selectedVariant,setSelectedVariant] = useState(null);
  const [error,setError] = useState("");

  const getRemainingStock = (variant) => {

    const item = cart.find(
      (i)=>i.id === product.id && i.size === variant.size
    );

    const qty = item ? item.quantity : 0;

    return variant.stock - qty;

  };

  const handleAdd = ()=>{

    if(!selectedVariant){
      setError("Choisissez une taille");
      return;
    }

    setError("");

    addToCart({
      ...product,
      size:selectedVariant.size,
      stock:selectedVariant.stock
    });

  };

  if(!product){
    return <p className="p-10 text-center">Produit introuvable</p>
  }

  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar/>

      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">

        {/* IMAGE */}

        <div className="bg-white p-6 rounded-xl shadow-md">

          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg"
          />

        </div>

        {/* DETAILS */}

        <div className="bg-white p-8 rounded-xl shadow-md">

          <h1 className="text-3xl text-black font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-2xl text-blue-600 font-bold mb-4">
            {product.price} FCFA
          </p>

          <p className="text-gray-600 mb-6">
            {product.description}
          </p>

          {/* VARIANTES */}

          <select
            className="w-full border text-black rounded-lg p-3"
            onChange={(e)=>{

              const v = product.variants.find(
                v => v.size.toString() === e.target.value
              );

              setSelectedVariant(v);
              setError("");

            }}
          >

            <option value="">Choisir taille</option>

            {product.variants.map((v)=>(

              <option key={v.size} value={v.size}>
                {v.size} (stock : {getRemainingStock(v)})
              </option>

            ))}

          </select>

          {error && (
            <p className="text-red-500 mt-2">
              {error}
            </p>
          )}

          {selectedVariant && (

            getRemainingStock(selectedVariant) > 0 ?

            <p className="text-green-600 mt-2">
              Stock restant : {getRemainingStock(selectedVariant)}
            </p>

            :

            <p className="text-red-500 mt-2">
              Rupture de stock
            </p>

          )}

          <button

            onClick={handleAdd}

            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"

          >

            <FaShoppingCart/>

            Ajouter au panier

          </button>

        </div>

      </section>

    </div>

  )

}