"use client";

import { useState,useEffect } from "react";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";

export default function ProductsPage(){

const [products,setProducts] = useState([]);
const [search,setSearch] = useState("");

useEffect(()=>{

fetch("/api/products")
.then(res=>res.json())
.then(data=>setProducts(data))

},[])

const filteredProducts = products.filter(p=>
p.name.toLowerCase().includes(search.toLowerCase())
);

return(

<div className="bg-gray-50 min-h-screen">

<Navbar/>

<section className="container-shop py-10">

<h1 className="text-2xl md:text-4xl font-extrabold text-center text-black mb-6">
Notre Boutique
</h1>

<p className="text-center text-gray-700 mb-8">
Découvrez tous nos produits
</p>

<div className="flex justify-center mb-10">

<input
type="text"
placeholder="Rechercher..."
className="w-full md:w-1/2 px-4 py-3 border rounded-lg shadow-sm text-black"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

{filteredProducts.length>0 ?

filteredProducts.map(product=>(
<ProductCard key={product._id} product={product}/>
))

:

<p className="text-center col-span-full text-gray-500">
Aucun produit trouvé
</p>

}

</div>

</section>

</div>

)

}