"use client";

import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import products from "../../data/products";
import { useState } from "react";

export default function ProductsPage(){

const [search,setSearch] = useState("");
const [category,setCategory] = useState("all");
const [price,setPrice] = useState("all");

const filteredProducts = products.filter(product =>{

const text = (
product.name +
" " +
product.description
).toLowerCase();

const matchSearch = text.includes(search.toLowerCase());

const matchCategory =
category === "all" || product.category === category;

const matchPrice =
price === "all" ||
(price === "low" && product.price < 10000) ||
(price === "mid" && product.price >= 10000 && product.price <= 30000) ||
(price === "high" && product.price > 30000);

return matchSearch && matchCategory && matchPrice;

});

return(

<div className="bg-gray-100 min-h-screen">

<Navbar/>

<section className="max-w-7xl mx-auto px-4 md:px-8 py-10">

<h1 className="text-2xl md:text-4xl font-bold text-center text-black mb-8">
Nos Produits
</h1>

{/* RECHERCHE */}

<div className="flex justify-center mb-6">

<input
type="text"
placeholder="Rechercher..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="w-full max-w-xs md:max-w-md border border-gray-300 p-2.5 rounded-lg text-sm md:text-base text-black focus:ring-2 focus:ring-blue-500"
/>

</div>

{/* FILTRES */}

<div className="flex flex-wrap gap-3 justify-center mb-8">

<select
value={category}
onChange={(e)=>setCategory(e.target.value)}
className="border p-2 rounded-lg text-black text-sm"
>

<option value="all">Toutes catégories</option>
<option value="chaussures">Chaussures</option>
<option value="tshirt">T-shirt</option>
<option value="pantalon">Pantalons</option>

</select>

<select
value={price}
onChange={(e)=>setPrice(e.target.value)}
className="border p-2 rounded-lg text-black text-sm"
>

<option value="all">Tous prix</option>
<option value="low">Moins de 10000</option>
<option value="mid">10000 - 30000</option>
<option value="high">Plus de 30000</option>

</select>

</div>

{/* PRODUITS */}

<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">

{filteredProducts.map((product)=>(
<ProductCard key={product._id} product={product}/>
))}

</div>

</section>

</div>

)

}