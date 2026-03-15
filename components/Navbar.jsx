"use client";

import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function Navbar(){

const { cart } = useCart();

const totalItems = cart.reduce(
(total,item)=> total + item.quantity,
0
);

return(

<nav className="bg-black w-full">

<div className="container-shop flex items-center justify-between py-4">

{/* Logo */}

<Link href="/">
<h1 className="text-xl md:text-3xl font-bold text-blue-500">
MHDS SHOP
</h1>
</Link>

{/* Menu toujours visible */}

<div className="flex gap-4 md:gap-8 text-white text-sm md:text-base">

<Link href="/" className="hover:text-blue-400">
Accueil
</Link>

<Link href="/products" className="hover:text-blue-400">
Produits
</Link>

</div>

{/* Panier */}

<Link href="/cart">

<div className="relative cursor-pointer">

<FaShoppingCart className="text-white text-xl md:text-2xl"/>

<span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 rounded-full">
{totalItems}
</span>

</div>

</Link>

</div>

</nav>

)

}