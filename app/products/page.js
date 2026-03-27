"use client";

import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export default function ProductsPage(){

  const [products,setProducts] = useState([]);
  const [loading,setLoading] = useState(true);

  const [search,setSearch] = useState("");
  const [category,setCategory] = useState("");
  const [categories,setCategories] = useState([]);

  const [minPrice,setMinPrice] = useState("");
  const [maxPrice,setMaxPrice] = useState("");

  /* ======================
  LOAD CATEGORIES
  ====================== */

  async function loadCategories(){
    try{
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    }catch(err){
      console.log(err);
    }
  }

  /* ======================
  LOAD PRODUCTS
  ====================== */

  async function loadProducts(){

    try{

      const params = new URLSearchParams({
        search,
        category,
        minPrice,
        maxPrice
      });

      const res = await fetch(`/api/products?${params}`);
      const data = await res.json();

      setProducts(data);
      setLoading(false);

    }catch(err){
      console.log(err);
    }

  }

  useEffect(()=>{
    loadProducts();
    loadCategories();
  },[]);

  useEffect(()=>{
    loadProducts();
  },[search,category,minPrice,maxPrice]);

  /* ======================
  STOCK GLOBAL PAR CATEGORIE
  ====================== */

  const stockByCategory = products.reduce((acc,product)=>{

    const total = product.variants?.reduce(
      (sum,v)=>sum + v.stock,0
    );

    if(!acc[product.category]){
      acc[product.category] = 0;
    }

    acc[product.category] += total;

    return acc;

  },{});

  /* ======================
  UI
  ====================== */

  return(

    <div className="bg-gray-100 min-h-screen">

      <Navbar/>

      <section className="max-w-7xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold mb-6">
          Nos Produits
        </h1>

        {/* STOCK PAR CATEGORIE */}
        <div className="flex flex-wrap gap-3 mb-6">

          {Object.keys(stockByCategory).map(cat=>(
            <div
              key={cat}
              className="bg-white px-4 py-2 rounded-xl shadow text-sm"
            >
              {cat} : {stockByCategory[cat]} en stock
            </div>
          ))}

        </div>

        {/* RECHERCHE */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">

          <div className="grid md:grid-cols-4 gap-4">

            <div className="md:col-span-2 relative">

              <FaSearch className="absolute left-4 top-4 text-gray-400"/>

              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                className="w-full border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <select
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              className="border rounded-xl p-3"
            >

              <option value="">
                Toutes catégories
              </option>

              {categories.map(cat=>(
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}

            </select>

          </div>

        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-gray-500">
            Chargement produits...
          </p>
        )}

        {/* PRODUITS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {products.map(product=>(

            <ProductCard
              key={product._id}
              product={product}
            />

          ))}

        </div>

      </section>

    </div>
  )
}