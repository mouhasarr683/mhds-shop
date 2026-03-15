"use client";

import { FaShoppingCart, FaInfoCircle, FaHeart, FaEye } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useState } from "react";
import Link from "next/link";
import QuickView from "./QuickView";

export default function ProductCard({ product }) {

const { addToCart, cart } = useCart();
const { toggleWishlist, isInWishlist } = useWishlist();

const [selectedVariant,setSelectedVariant] = useState(null);
const [error,setError] = useState("");
const [added,setAdded] = useState(false);
const [showDescription,setShowDescription] = useState(false);
const [showQuickView,setShowQuickView] = useState(false);


/* STOCK RESTANT */

const getRemainingStock = (variant)=>{

const item = cart.find(
i=> i._id === product._id && i.size === variant.size
);

const qty = item ? item.quantity : 0;

return variant.stock - qty;

};


/* STOCK GLOBAL */

const totalStock = product.variants.reduce(
(total,v)=> total + getRemainingStock(v),
0
);


/* BADGES PRODUITS */

let badge = null;

if(totalStock === 0){
badge = "Rupture";
}
else if(totalStock <= 5){
badge = "Stock faible";
}
else if(product.isNew){
badge = "Nouveau";
}
else if(product.bestSeller){
badge = "Best Seller";
}


/* AJOUT PANIER */

const handleAddToCart = ()=>{

if(!selectedVariant){
setError("Choisir taille");
return;
}

const remaining = getRemainingStock(selectedVariant);

if(remaining <= 0){
setError("Rupture de stock");
return;
}

setError("");

addToCart({
...product,
size:selectedVariant.size,
stock:selectedVariant.stock
});

/* animation */

setAdded(true);

setTimeout(()=>{
setAdded(false);
},1500);

};


/* UI */

return(

<div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden">

{/* IMAGE */}

<div className="relative">

<Link href={`/product/${product._id}`}>

<img
src={product.image}
alt={product.name}
className="w-full h-40 md:h-52 object-cover"
/>

</Link>


{/* WISHLIST */}

<button
onClick={()=>toggleWishlist(product)}
className="absolute top-2 right-2 bg-white p-2 rounded-full shadow"
>

<FaHeart
className={`text-sm ${
isInWishlist(product._id)
? "text-red-500"
: "text-gray-400"
}`}
/>

</button>


{/* QUICK VIEW */}

<button
onClick={()=>setShowQuickView(true)}
className="absolute bottom-2 right-2 bg-black/70 text-white p-2 rounded-full text-xs hover:bg-black"
>

<FaEye/>

</button>


{/* BADGE */}

{badge && (

<span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded-full text-white

${badge === "Rupture" ? "bg-red-500" :
badge === "Stock faible" ? "bg-orange-500" :
badge === "Nouveau" ? "bg-green-600" :
"bg-blue-600"}

`}>

{badge}

</span>

)}

</div>


<div className="p-3 md:p-4">


{/* NOM */}

<div className="flex justify-between items-center">

<Link href={`/product/${product._id}`}>

<h3 className="text-sm md:text-base font-semibold text-gray-800 hover:text-blue-600 line-clamp-1">
{product.name}
</h3>

</Link>

<FaInfoCircle
onClick={()=>setShowDescription(!showDescription)}
className="text-gray-400 cursor-pointer hover:text-blue-600 text-sm"
/>

</div>


{/* STOCK */}

{!selectedVariant ? (

<p className={`text-xs mt-1 font-semibold ${
totalStock === 0 ? "text-red-500" : "text-green-600"
}`}>

{totalStock === 0
? "Rupture de stock"
: `Stock total : ${totalStock}`
}

</p>

) : (

<p className={`text-xs mt-1 font-semibold ${
getRemainingStock(selectedVariant) === 0
? "text-red-500"
: getRemainingStock(selectedVariant) <= 3
? "text-orange-500"
: "text-green-600"
}`}>

{getRemainingStock(selectedVariant) === 0
? `Rupture taille ${selectedVariant.size}`
: getRemainingStock(selectedVariant) <= 3
? `⚠️ Plus que ${getRemainingStock(selectedVariant)} (taille ${selectedVariant.size})`
: `Stock taille ${selectedVariant.size} : ${getRemainingStock(selectedVariant)}`
}

</p>

)}


{/* DESCRIPTION */}

{showDescription && (

<p className="text-gray-500 text-xs mt-2 line-clamp-3">
{product.description}
</p>

)}


{/* PRIX */}

<p className="text-blue-600 font-bold mt-2 text-sm md:text-base">
{product.price} FCFA
</p>


{/* TAILLES */}

<div className="mt-3 flex flex-wrap gap-2">

{product.variants.map((variant)=>{

const remaining = getRemainingStock(variant);

return(

<button
key={variant.size}
onClick={()=>{
setSelectedVariant(variant);
setError("");
}}
disabled={remaining === 0}
className={`px-3 py-1 rounded-lg border text-xs md:text-sm font-semibold transition

${selectedVariant?.size === variant.size
? "bg-blue-600 text-white border-blue-600"
: remaining === 0
? "bg-gray-200 text-gray-400 cursor-not-allowed"
: remaining <= 3
? "bg-orange-100 text-orange-600 border-orange-400"
: "bg-white text-gray-700 hover:bg-gray-100"}

`}
>

{variant.size}

</button>

)

})}

</div>


{/* ERREUR */}

{error && (

<p className="text-red-500 text-xs mt-2">
{error}
</p>

)}


{/* BOUTON AJOUT PANIER */}

<button

onClick={handleAddToCart}

disabled={
selectedVariant &&
getRemainingStock(selectedVariant) <= 0
}

className={`mt-3 w-full py-2 rounded-lg flex items-center justify-center gap-2 transition text-xs md:text-sm

${added
? "bg-green-600 text-white scale-105"
: "bg-blue-600 hover:bg-blue-700 text-white"}

disabled:bg-gray-400

`}

>

<FaShoppingCart/>

{added ? "Ajouté ✓" : "Ajouter au panier"}

</button>

</div>


{/* QUICK VIEW POPUP */}

{showQuickView && (

<QuickView
product={product}
onClose={()=>setShowQuickView(false)}
/>

)}

</div>

);

}