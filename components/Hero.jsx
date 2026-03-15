"use client";

/*
Hero Section moderne pour MHDS SHOP

Ajouts :
- badges e-commerce
- icônes modernes
- section avantages
*/

import { FaShippingFast, FaShieldAlt, FaHeadset } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="w-full py-24 bg-gray-50 flex items-center">

      <div className="w-full px-10 grid md:grid-cols-2 items-center gap-10">

        {/* Texte */}
        <div>

          {/* Badge */}
          <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold">
            Boutique e-commerce moderne
          </span>

          {/* Titre */}
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mt-4">
            Bienvenue sur <span className="text-blue-600">MHDS SHOP</span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-gray-600 text-lg">
            Découvrez des produits de qualité sélectionnés spécialement pour vous.
            Commandez facilement et recevez vos produits rapidement.
          </p>

          <a
          href="/products"
          className="inline-block mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition shadow-lg"
          >
            Voir nos produits
          </a>

          {/* Avantages */}
          <div className="flex gap-8 mt-10">

            <div className="flex items-center gap-2 text-gray-700">
              <FaShippingFast className="text-blue-600 text-xl"/>
              Livraison rapide
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <FaShieldAlt className="text-blue-600 text-xl"/>
              Paiement sécurisé
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <FaHeadset className="text-blue-600 text-xl"/>
              Assistance client
            </div>

          </div>

        </div>

        {/* Image */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da"
            alt="shopping"
            className="w-full rounded-xl shadow-lg"
          />
        </div>

      </div>

    </section>
  );
}