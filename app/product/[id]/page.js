"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import Navbar from "../../../components/Navbar";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import ProductCard from "../../../components/ProductCard";

export default function ProductPage(){

  const { id } = useParams();

  const { addToCart, cart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product,setProduct] = useState(null);
  const [products,setProducts] = useState([]);

  const [selectedVariant,setSelectedVariant] = useState(null);
  const [error,setError] = useState("");

  /* ======================
  LOAD DATA
  ====================== */

  useEffect(()=>{

    async function load(){

      try{

        const res = await fetch(`/api/products`);
        const data = await res.json();

        setProducts(data);

        const found = data.find(p=>p._id === id);

        if(found){
          setProduct(found);
        }

      }catch(err){
        console.log(err);
      }

    }

    load();

  },[id]);

  /* ======================
  STOCK DYNAMIQUE
  ====================== */

  const getRemainingStock = (variant) => {

    if(!product) return 0;

    const item = cart.find(
      (i)=>i._id === product._id && i.size === variant.size
    );

    const qty = item ? item.quantity : 0;

    return variant.stock - qty;

  };

  /* ======================
  ADD PANIER
  ====================== */

  const handleAdd = ()=>{

    if(!selectedVariant){
      setError("Veuillez choisir une taille");
      return;
    }

    if(getRemainingStock(selectedVariant) <= 0){
      setError("Stock épuisé");
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
    return <p className="p-10 text-center">Chargement...</p>
  }

  /* ======================
  STOCK TOTAL
  ====================== */

  const totalStock = product.variants.reduce(
    (total,v)=> total + v.stock,
    0
  );

  /* ======================
  PRODUITS SIMILAIRES
  ====================== */

  const similarProducts = products.filter(
    (p)=>p.category === product.category && p._id !== product._id
  ).slice(0,4);

  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar/>

      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div className="bg-white p-6 rounded-xl shadow">

          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] object-cover rounded-lg"
          />

        </div>

        {/* DETAILS */}
        <div className="bg-white p-8 rounded-xl shadow">

          <h1 className="text-3xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-2xl text-blue-600 font-bold mb-2">
            {product.price} FCFA
          </p>

          <p className="text-sm text-gray-500 mb-4">
            Stock total : {totalStock}
          </p>

          <p className="text-gray-600 mb-6">
            {product.description}
          </p>

          {/* FAVORIS */}
          <button
            onClick={()=>toggleWishlist(product)}
            className={`mb-6 text-xl ${
              isInWishlist(product._id)
              ? "text-red-500"
              : "text-gray-400"
            }`}
          >
            <FaHeart/>
          </button>

          {/* ======================
          VARIANTES (TAILLES)
          ====================== */}

          <div className="mb-6">

            <p className="font-semibold mb-2">
              Choisir une taille
            </p>

            <div className="flex gap-2 flex-wrap">

              {product.variants.map((v)=>{

                const stock = getRemainingStock(v);
                const isSelected = selectedVariant?.size === v.size;

                return(
                  <button
                    key={v.size}
                    onClick={()=>setSelectedVariant(v)}
                    disabled={stock === 0}
                    className={`
                      px-4 py-2 rounded-lg border transition
                      ${isSelected ? "bg-black text-white" : "bg-white"}
                      ${stock === 0
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:bg-black hover:text-white"
                      }
                    `}
                  >
                    {v.size}
                  </button>
                )
              })}

            </div>

            {!selectedVariant && (
              <p className="text-red-500 text-sm mt-2">
                Sélection obligatoire
              </p>
            )}

            {selectedVariant && (
              getRemainingStock(selectedVariant) > 0 ? (
                <p className="text-green-600 text-sm mt-2">
                  Stock restant : {getRemainingStock(selectedVariant)}
                </p>
              ) : (
                <p className="text-red-500 text-sm mt-2">
                  Rupture de stock
                </p>
              )
            )}

          </div>

          {error && (
            <p className="text-red-500 mb-3">
              {error}
            </p>
          )}

          {/* ADD */}
          <button
            onClick={handleAdd}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <FaShoppingCart/>
            Ajouter au panier
          </button>

        </div>

      </section>

      {/* ======================
      SIMILAIRES
      ====================== */}

      <section className="max-w-7xl mx-auto px-6 pb-16">

        <h2 className="text-2xl font-bold mb-6">
          Produits similaires
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {similarProducts.map(p=>(
            <ProductCard key={p._id} product={p}/>
          ))}

        </div>

      </section>

    </div>
  )
}