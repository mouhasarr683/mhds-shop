"use client";

import { useEffect,useState } from "react";
import Navbar from "@/components/Navbar";

export default function AdminDashboard(){

const [stats,setStats] = useState(null);

async function loadStats(){

const res = await fetch("/api/admin/stats");
const data = await res.json();

setStats(data);

}

useEffect(()=>{
loadStats();
},[]);

if(!stats){

return(
<div className="p-10">
Chargement...
</div>
);

}

return(

<div className="bg-gray-100 min-h-screen">

<Navbar/>

<section className="max-w-6xl mx-auto px-6 py-12">

<h1 className="text-4xl font-bold mb-10">
Dashboard
</h1>

{/* CARDS */}

<div className="grid md:grid-cols-3 gap-6 mb-10">

<div className="bg-white p-6 rounded-xl shadow">

<p className="text-gray-500">
Total ventes
</p>

<p className="text-3xl font-bold text-green-600">
{stats.totalSales} FCFA
</p>

</div>

<div className="bg-white p-6 rounded-xl shadow">

<p className="text-gray-500">
Commandes
</p>

<p className="text-3xl font-bold text-blue-600">
{stats.totalOrders}
</p>

</div>

<div className="bg-white p-6 rounded-xl shadow">

<p className="text-gray-500">
Produit #1
</p>

<p className="text-2xl font-bold text-purple-600">
{stats.topProducts[0]?.name || "Aucun"}
</p>

</div>

</div>

{/* TOP PRODUITS */}

<div className="bg-white p-6 rounded-xl shadow">

<h2 className="text-xl font-bold mb-6">
Top produits vendus
</h2>

<div className="space-y-3">

{stats.topProducts.map((p,i)=>(

<div
key={i}
className="flex justify-between border-b pb-2"
>

<p>
{i+1}. {p.name}
</p>

<p className="font-bold">
{p.qty} ventes
</p>

</div>

))}

</div>

</div>

</section>

</div>

)

}