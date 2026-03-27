"use client";

import { useState, useMemo } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {

const { addToCart, cart } = useCart();

const [size,setSize] = useState(null);
const [color,setColor] = useState(null);
const [error,setError] = useState("");
const [added,setAdded] = useState(false);

/* =========================
SAFE VARIANTS
========================= */

const variants = product.variants || [];

/* =========================
SIZES
========================= */

const sizes = useMemo(() => (
[...new Set(variants.map(v => v.size).filter(Boolean))]
), [variants]);

/* =========================
COLORS (depends size)
========================= */

const colors = useMemo(() => {

if(!size) return [];

return [...new Set(
variants
.filter(v => v.size === size && v.color)
.map(v => v.color)
)];

}, [variants, size]);

/* =========================
SELECTED VARIANT (FIXED)
========================= */

const selectedVariant = useMemo(() => {

return variants.find(v => {

if(v.size !== size) return false;

if(v.color){
return v.color === color;
}

return true;

});

}, [variants, size, color]);

/* =========================
STOCK
========================= */

const getStock = () => {

if(!selectedVariant) return 0;

const item = cart.find(i =>
i._id === product._id &&
i.size === size &&
i.color === color
);

const qty = item?.quantity || 0;

return (selectedVariant.stock || 0) - qty;

};

const stock = getStock();

/* TOTAL STOCK (FIX) */
const totalStock = variants.reduce(
(t,v)=>t + (v.stock || 0),0
);

/* =========================
BADGE
========================= */

let badge = null;

if(totalStock === 0) badge = "Rupture";
else if(totalStock <= 5) badge = "Stock faible";
else badge = "Disponible";

/* =========================
ADD TO CART
========================= */

function handleAdd(){

if(!size){
setError("Choisir taille");
return;
}

if(colors.length > 0 && !color){
setError("Choisir couleur");
return;
}

if(stock <= 0){
setError("Rupture de stock");
return;
}

addToCart({
...product,
size,
color,
stock:selectedVariant.stock
});

setError("");
setAdded(true);

setTimeout(()=>setAdded(false),1200);

}

/* =========================
UI
========================= */

return(

<div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden group">

{/* IMAGE */}
<div className="relative">

<img
src={product.image}
className="w-full h-52 object-cover group-hover:scale-105 transition duration-500"
/>

{/* BADGE */}
<span className={`absolute top-2 left-2 text-xs px-3 py-1 rounded-full text-white
${totalStock === 0 ? "bg-red-600" : "bg-green-600"}`}>
{badge}
</span>

</div>

{/* CONTENT */}
<div className="p-4">

<h2 className="font-semibold text-gray-800">
{product.name}
</h2>

<p className="text-blue-600 font-bold mt-1">
{product.price} FCFA
</p>

<p className="text-xs text-gray-500">
Stock total : {totalStock}
</p>

{/* SIZE */}
<div className="flex flex-wrap gap-2 mt-3">

{sizes.map(s=>(

<button
key={s}
onClick={()=>{
setSize(s);
setColor(null);
}}
className={`px-3 py-1 border rounded-lg text-sm transition
${size===s
? "bg-black text-white"
: "bg-white hover:bg-black hover:text-white"}
`}
>
{s}
</button>

))}

</div>

{/* COLORS */}
{size && colors.length > 0 && (

<div className="flex flex-wrap gap-2 mt-2">

{colors.map(c=>(

<button
key={c}
onClick={()=>setColor(c)}
className={`px-3 py-1 border rounded-lg text-sm transition
${color===c
? "bg-black text-white"
: "bg-white hover:bg-black hover:text-white"}
`}
>
{c}
</button>

))}

</div>

)}

{/* STOCK VARIANT */}
{selectedVariant && (
<p className="text-xs mt-2 text-gray-500">
Stock dispo : {stock}
</p>
)}

{/* ERROR */}
{error && (
<p className="text-red-500 text-xs mt-2">{error}</p>
)}

{/* BUTTON */}
<button
onClick={handleAdd}
disabled={totalStock === 0}
className={`mt-4 w-full py-2 rounded-lg flex items-center justify-center gap-2 transition
${totalStock === 0
? "bg-gray-400 cursor-not-allowed"
: "bg-blue-600 text-white hover:bg-blue-700"}
`}
>
<FaShoppingCart/>
{added ? "Ajouté ✓" : "Ajouter au panier"}
</button>

</div>

</div>

);

}