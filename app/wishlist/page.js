"use client";

import Navbar from "../../components/Navbar";
import { useWishlist } from "../../context/WishlistContext";
import ProductCard from "../../components/ProductCard";

export default function WishlistPage(){

const { wishlist } = useWishlist();

return(

<div className="bg-gray-100 min-h-screen">

<Navbar/>

<section className="max-w-7xl mx-auto px-4 md:px-8 py-12">

<h1 className="text-3xl md:text-4xl font-bold text-center text-black mb-10">
Mes favoris ❤️
</h1>

{wishlist.length === 0 ? (

<div className="text-center py-20">

<p className="text-black text-lg mb-4">
Votre liste de favoris est vide
</p>

<p className="text-black">
Ajoutez des produits pour les retrouver plus tard
</p>

</div>

) : (

<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

{wishlist.map((product)=>(
<ProductCard key={product._id} product={product}/>
))}

</div>

)}

</section>

</div>

);

}