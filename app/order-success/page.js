"use client";

import Link from "next/link";
import Navbar from "../../components/Navbar";
import { FaCheckCircle } from "react-icons/fa";

export default function OrderSuccess(){

return(

<div className="min-h-screen bg-gray-100">

<Navbar/>

<div className="flex items-center justify-center px-6 py-20">

<div className="bg-white shadow-xl rounded-3xl p-10 max-w-xl w-full text-center">

<FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6"/>

<h1 className="text-3xl font-bold text-gray-800 mb-4">
Commande validée
</h1>

<p className="text-gray-600 text-lg mb-2">
Merci d'avoir choisi
</p>

<p className="text-blue-600 font-bold text-xl mb-6">
MHDS SHOP
</p>

<p className="text-gray-600 mb-6">
Votre commande a bien été enregistrée.
Notre équipe vous contactera très bientôt
pour confirmer la livraison.
</p>

<p className="text-gray-500 mb-8">
📞 Restez à l'écoute
</p>

<Link href="/products">

<button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">
Continuer mes achats
</button>

</Link>

</div>

</div>

</div>

);

}