"use client";

import { useState } from "react";
import { FaTimes, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function QuickView({ product, onClose }) {

const { addToCart } = useCart();
const [selectedVariant,setSelectedVariant] = useState(null);
const [error,setError] = useState("");

const handleAdd = ()=>{

if(!selectedVariant){
setError("Choisir une taille");
return;
}

addToCart({
...product,
size:selectedVariant.size,
stock:selectedVariant.stock
});

onClose();

};

return(

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

<div className="bg-white rounded-2xl max-w-md w-full p-6 relative">

{/* fermer */}

<button
onClick={onClose}
className="absolute top-3 right-3 text-gray-500"
>
<FaTimes/>
</button>

{/* image */}

<img
src={product.image}
className="w-full h-52 object-cover rounded-xl"
/>

{/* nom */}

<h2 className="text-lg font-bold mt-4 text-black">
{product.name}
</h2>

{/* prix */}

<p className="text-blue-600 font-bold text-lg mt-1">
{product.price} FCFA
</p>

{/* tailles */}

<div className="flex flex-wrap gap-2 mt-4">

{product.variants.map((v)=>(

<button
key={v.size}
onClick={()=>setSelectedVariant(v)}
className={`px-3 py-1 border rounded-lg text-sm
${selectedVariant?.size===v.size
? "bg-blue-600 text-white"
: "bg-gray-100"}
`}
>

{v.size}

</button>

))}

</div>

{error && (
<p className="text-red-500 text-sm mt-2">
{error}
</p>
)}

{/* bouton */}

<button
onClick={handleAdd}
className="w-full mt-5 bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
>

<FaShoppingCart/>

Ajouter au panier

</button>

</div>

</div>

);

}