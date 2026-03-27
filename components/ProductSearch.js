"use client";

import {useState,useEffect} from "react";

export default function ProductSearch({setProducts}){

const [search,setSearch] = useState("");
const [category,setCategory] = useState("");
const [categories,setCategories] = useState([]);
const [minPrice,setMinPrice] = useState("");
const [maxPrice,setMaxPrice] = useState("");


/* LOAD CATEGORIES */

useEffect(()=>{

fetch("/api/categories")
.then(res=>res.json())
.then(data=>setCategories(data));

},[]);


/* SEARCH */

useEffect(()=>{

const params = new URLSearchParams({

search,
category,
minPrice,
maxPrice

});

fetch(`/api/products?${params}`)
.then(res=>res.json())
.then(data=>setProducts(data));

},[search,category,minPrice,maxPrice]);


return(

<div className="bg-white p-6 rounded-xl shadow mb-8">

<input
placeholder="Rechercher un produit..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="border p-3 w-full mb-4 rounded"
/>


<select
value={category}
onChange={(e)=>setCategory(e.target.value)}
className="border p-3 w-full mb-4 rounded"
>

<option value="">Toutes les catégories</option>

{categories.map(cat=>(

<option key={cat}>
{cat}
</option>

))}

</select>


<div className="flex gap-4">

<input
placeholder="Prix min"
value={minPrice}
onChange={(e)=>setMinPrice(e.target.value)}
className="border p-3 w-full rounded"
/>

<input
placeholder="Prix max"
value={maxPrice}
onChange={(e)=>setMaxPrice(e.target.value)}
className="border p-3 w-full rounded"
/>

</div>

</div>

)

}