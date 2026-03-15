import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

/*
Page d'accueil MHDS SHOP
*/

export default function Home() {
  return (
    <div>

      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Section Produits */}
      <section className=" px-8 bg-gray-100">

            <h2 className="text-4xl font-extrabold text-blue-900 text-center mb-12">
                ⭐ Produits populaires
            </h2>

        {/* Grille produits */}
        <div className="grid md:grid-cols-4 gap-8">

          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

        </div>

      </section>

    </div>
  );
}