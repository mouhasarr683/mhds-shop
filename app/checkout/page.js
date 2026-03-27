"use client";

import { useCart } from "../../context/CartContext";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaTruck } from "react-icons/fa";

export default function CheckoutPage() {

const { cart, clearCart } = useCart();
const router = useRouter();

const [firstName,setFirstName] = useState("");
const [lastName,setLastName] = useState("");
const [phone,setPhone] = useState("");
const [email,setEmail] = useState("");
const [address,setAddress] = useState("");
const [city,setCity] = useState("");

/* FRAIS LIVRAISON */

const deliveryFee =
city === "Dakar" ? 2000 :
city === "Hors Dakar" ? 3000 :
0;

const totalProducts = cart.reduce(
(total,item)=> total + item.price * item.quantity,
0
);

const total = totalProducts + deliveryFee;


/* VALIDATION COMMANDE */

const handleOrder = async () => {

if(cart.length === 0){
alert("Votre panier est vide");
return;
}

if(!city){
alert("Veuillez choisir votre ville");
return;
}

if(!firstName || !lastName || !phone || !address){
alert("Veuillez remplir les informations importantes");
return;
}

/* FORMAT PRODUITS */

let products = "";

cart.forEach((item)=>{
products += `${item.name} (${item.size}) x${item.quantity} - ${item.price * item.quantity} FCFA\n`;
});


/* =========================
ENREGISTRER COMMANDE DB
========================= */

await fetch("/api/orders",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

customerName:`${firstName} ${lastName}`,
phone:phone,
city:city,
address:address,

items:cart.map(item=>({
productId:item._id,
name:item.name,
size:item.size,
price:item.price,
quantity:item.quantity
})),

total:total

})

});


/* =========================
ENVOI EMAIL ADMIN
========================= */

await fetch("https://formsubmit.co/ajax/mouhasarr676@gmail.com", {

method: "POST",

headers: {
"Content-Type": "application/json",
"Accept": "application/json"
},

body: JSON.stringify({

prenom:firstName,
nom:lastName,
telephone:phone,
email:email,
ville:city,
adresse:address,
produits:products,
sous_total:totalProducts,
livraison:deliveryFee,
total:total

})

});


/* =========================
VIDER PANIER
========================= */

clearCart();

/* REDIRECTION CLIENT */

router.push("/order-success");

};


return(

<div className="bg-gray-100 min-h-screen">

<Navbar/>

<section className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16 grid md:grid-cols-2 gap-10">

{/* FORMULAIRE CLIENT */}

<div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">

<h2 className="text-2xl font-bold text-black mb-6">
Informations de livraison
</h2>

<div className="space-y-4">

{/* CHOIX VILLE */}

<div>

<p className="text-black font-semibold mb-3">
Choisissez votre ville
</p>

<div className="flex gap-3">

<button
type="button"
onClick={()=>setCity("Dakar")}
className={`flex-1 py-3 rounded-lg border font-semibold transition ${
city==="Dakar"
? "bg-blue-600 text-white"
: "bg-white text-black"
}`}
>
Dakar
</button>

<button
type="button"
onClick={()=>setCity("Hors Dakar")}
className={`flex-1 py-3 rounded-lg border font-semibold transition ${
city==="Hors Dakar"
? "bg-blue-600 text-white"
: "bg-white text-black"
}`}
>
Hors Dakar
</button>

</div>

</div>


{/* FORMULAIRE */}

{city && (

<>

<input
type="text"
placeholder="Prénom"
value={firstName}
onChange={(e)=>setFirstName(e.target.value)}
className="w-full text-black border p-3 rounded-lg"
/>

<input
type="text"
placeholder="Nom"
value={lastName}
onChange={(e)=>setLastName(e.target.value)}
className="w-full text-black border p-3 rounded-lg"
/>

<input
type="tel"
placeholder="Téléphone"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
className="w-full text-black border p-3 rounded-lg"
/>

<input
type="email"
placeholder="Email (optionnel)"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full text-black border p-3 rounded-lg"
/>

<input
type="text"
placeholder="Adresse complète"
value={address}
onChange={(e)=>setAddress(e.target.value)}
className="w-full text-black border p-3 rounded-lg"
/>

</>

)}

</div>

</div>


{/* RECAP COMMANDE */}

<div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">

<h2 className="text-2xl text-black font-bold mb-6">
Récapitulatif de la commande
</h2>

{cart.length === 0 ? (

<p className="text-gray-500 text-center py-10">
Votre panier est vide
</p>

) : (

<div className="space-y-4">

{cart.map((item)=>(

<div
key={item._id + item.size}
className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
>

<div className="flex items-center gap-4">

<img
src={item.image}
className="w-14 h-14 object-cover rounded-lg"
/>

<div>

<p className="text-black font-semibold">
{item.name}
</p>

<p className="text-gray-500 text-sm">
Taille : {item.size} • Quantité : {item.quantity}
</p>

</div>

</div>

<p className="text-black font-bold">
{item.price * item.quantity} FCFA
</p>

</div>

))}

</div>

)}

<hr className="my-6"/>

<div className="space-y-3">

<div className="flex justify-between text-gray-600">
<p>Sous-total</p>
<p className="font-semibold">{totalProducts} FCFA</p>
</div>

<div className="flex justify-between text-gray-600">
<p>Livraison</p>
<p className={`font-semibold ${
deliveryFee === 0 ? "text-gray-400" : "text-orange-500"
}`}>
{deliveryFee} FCFA
</p>
</div>

</div>

<div className="flex justify-between items-center mt-6 bg-blue-50 p-4 rounded-xl">

<p className="text-lg text-black font-bold">
Total
</p>

<p className="text-2xl text-blue-600 font-extrabold">
{total} FCFA
</p>

</div>

<button
onClick={handleOrder}
className="w-full mt-8 flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-green-500 text-white py-3 rounded-xl hover:scale-[1.02] hover:shadow-lg transition font-semibold text-lg"
>

<FaTruck/>

Valider la commande

</button>

</div>

</section>

</div>

);

}