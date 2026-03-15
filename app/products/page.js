"use client";

import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import products from "../../data/products";
import { useState } from "react";

export default function ProductsPage(){

const [search,setSearch] = useState("");

const filteredProducts = products.filter(product =>{

const text = (
product.name +
" " +
product.description
).toLowerCase();

return text.includes(search.toLowerCase());

});

return(

<div className="bg-gray-100 min-h-screen">

<Navbar/>

<section className="max-w-7xl mx-auto px-4 md:px-8 py-12">

<h1 className="text-3xl md:text-4xl font-bold text-center text-black mb-8">
Nos Produits
</h1>

{/* BARRE RECHERCHE */}

<div className="mb-10 flex justify-center">

<input
type="text"
placeholder="Rechercher un produit..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="w-full max-w-lg border p-3 rounded-lg text-black"
/>

</div>

{/* PRODUITS */}

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

{filteredProducts.map((product)=>(
<ProductCard key={product._id} product={product}/>
))}

</div>

</section>

</div>

)

}