"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";

export default function ProductsPage() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  /*
  Charger produits depuis la base de données
  */

  useEffect(() => {

    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));

  }, []);

  /*
  Filtre recherche
  */

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">

      <Navbar />

      <section className="px-10 py-16">

        <h1 className="text-4xl font-extrabold text-center text-black mb-6">
          Notre Boutique
        </h1>

        <p className="text-center text-gray-700 mb-10">
          Découvrez tous nos produits disponibles sur MHDS SHOP
        </p>

        {/* Recherche */}

        <div className="flex text-black justify-center mb-12">

          <input
            type="text"
            placeholder="Rechercher un produit..."
            className="w-full md:w-1/2 px-6 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {/* Produits */}

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

          {filteredProducts.length > 0 ? (

            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))

          ) : (

            <p className="text-center col-span-full text-gray-500">
              Aucun produit trouvé
            </p>

          )}

        </div>

      </section>

    </div>
  );
}