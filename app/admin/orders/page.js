"use client";

/*
Page Admin Commandes
Permet de voir toutes les commandes clients
*/

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function AdminOrders(){

const [orders,setOrders] = useState([]);
const [showConfirm,setShowConfirm] = useState(false);
const [orderToDelete,setOrderToDelete] = useState(null);

/* ======================
CHARGER COMMANDES
====================== */

async function loadOrders(){

const res = await fetch("/api/orders");
const data = await res.json();

setOrders(data);

}

useEffect(()=>{
loadOrders();
},[]);

/* ======================
UPDATE STATUS
====================== */

async function updateStatus(id,status){

await fetch(`/api/orders/${id}`,{

method:"PATCH",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({status})

});

loadOrders();

}

/* ======================
SUPPRIMER COMMANDE
====================== */

function askDelete(id){

setOrderToDelete(id);
setShowConfirm(true);

}

async function confirmDelete(){

await fetch(`/api/orders/${orderToDelete}`,{
method:"DELETE"
});

setShowConfirm(false);
setOrderToDelete(null);

loadOrders();

}

/* ======================
COULEUR STATUT
====================== */

function getStatusStyle(status){

switch(status){

case "nouvelle":
return "bg-orange-100 text-orange-700";

case "preparation":
return "bg-blue-100 text-blue-700";

case "livree":
return "bg-green-100 text-green-700";

default:
return "bg-gray-100 text-gray-600";

}

}

/* ======================
UI
====================== */

return(

<div className="bg-gray-100 min-h-screen">

<Navbar/>

<section className="max-w-6xl mx-auto px-6 py-12">

<h1 className="text-4xl font-bold mb-10">
Commandes Clients
</h1>

{orders.length === 0 ? (

<p className="text-gray-500">
Aucune commande pour le moment
</p>

) : (

<div className="space-y-6">

{orders.map(order=>(

<div
key={order._id}
className="bg-white rounded-xl shadow p-6"
>

{/* CLIENT */}

<div className="flex justify-between mb-4">

<div>

<h2 className="font-bold text-lg">
{order.customerName}
</h2>

<p className="text-gray-500 text-sm">
📱 {order.phone}
</p>

<p className="text-gray-500 text-sm">
📍 {order.city} — {order.address}
</p>

</div>

<div className="text-right">

<p className="text-blue-600 font-bold text-lg">
{order.total} FCFA
</p>

<p className="text-sm text-gray-400">
{new Date(order.createdAt).toLocaleDateString()}
</p>

<p className={`mt-2 px-2 py-1 text-xs rounded ${getStatusStyle(order.status)}`}>
{order.status || "nouvelle"}
</p>

</div>

</div>

{/* PRODUITS */}

<div className="border-t pt-4 space-y-2">

{order.items.map((item,i)=>(

<div
key={i}
className="flex justify-between text-sm"
>

<p>
{item.name} ({item.size})
</p>

<p>
x{item.quantity}
</p>

</div>

))}

</div>

{/* ACTIONS */}

<div className="mt-4 flex gap-2 flex-wrap">

<button
onClick={()=>updateStatus(order._id,"nouvelle")}
className="px-3 py-1 text-xs bg-orange-200 text-orange-700 rounded"
>
Nouvelle
</button>

<button
onClick={()=>updateStatus(order._id,"preparation")}
className="px-3 py-1 text-xs bg-blue-200 text-blue-700 rounded"
>
Préparation
</button>

<button
onClick={()=>updateStatus(order._id,"livree")}
className="px-3 py-1 text-xs bg-green-200 text-green-700 rounded"
>
Livrée
</button>

{/* SUPPRIMER SI LIVRÉ */}

{order.status === "livree" && (

<button
onClick={()=>askDelete(order._id)}
className="px-3 py-1 text-xs bg-red-500 text-white rounded"
>
Supprimer
</button>

)}

</div>

</div>

))}

</div>

)}

</section>
{showConfirm && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

<div className="bg-white p-6 rounded-xl shadow-xl w-[350px]">

<h2 className="text-lg font-bold mb-4">
Supprimer la commande ?
</h2>

<p className="text-gray-500 mb-6">
Cette action est irréversible.
</p>

<div className="flex justify-end gap-3">

<button
onClick={()=>setShowConfirm(false)}
className="px-4 py-2 rounded bg-gray-200"
>
Annuler
</button>

<button
onClick={confirmDelete}
className="px-4 py-2 rounded bg-red-500 text-white"
>
Supprimer
</button>

</div>

</div>

</div>

)}

</div>

)

}