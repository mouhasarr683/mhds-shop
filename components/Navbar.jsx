"use client";

/*
Navbar professionnelle pour MHDS SHOP

Contient :
- Logo
- Navigation
- Barre de recherche
- Panier dynamique
*/

import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function Navbar() {

  /*
  Récupération du panier
  */

  const { cart } = useCart();

  /*
  Calcul du nombre total d'articles
  */

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (

    <nav className="w-full bg-black shadow-md">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}

        <Link href="/">
          <h1 className="text-3xl font-extrabold tracking-wide text-blue-500 cursor-pointer">
            MHDS SHOP
          </h1>
        </Link>


        {/* Menu */}

        <ul className="hidden md:flex space-x-8 text-white font-medium">

          <Link href="/">
            <li className="hover:text-blue-400 cursor-pointer">
              Accueil
            </li>
          </Link>

          <Link href="/products">
            <li className="hover:text-blue-400 cursor-pointer">
              Produits
            </li>
          </Link>

          <li className="hover:text-blue-400 cursor-pointer">
            Catégories
          </li>

        </ul>


        {/* Barre de recherche */}

        <input
          type="text"
          placeholder="Rechercher un produit..."
          className="hidden md:block border rounded-lg px-3 py-1 focus:outline-none"
        />


        {/* Panier */}

        <Link href="/cart">

          <div className="relative cursor-pointer">

            {/* Icône panier */}

            <FaShoppingCart className="text-3xl text-white hover:text-blue-400 transition duration-300" />

            {/* Badge nombre produits */}

            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">

              {totalItems}

            </span>

          </div>

        </Link>

      </div>

    </nav>

  );
}