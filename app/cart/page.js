"use client";

import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";  // Ajout de l'import de Navbar

export default function CartPage() {

  const { cart, increaseQty, decreaseQty, errorItem } = useCart();
  const router = useRouter();

  /*
  Calcul du prix total
  */
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-100 min-h-screen">

      <Navbar /> {/* Assure-toi que le composant Navbar est correctement importé et utilisé */}

      <section className="max-w-7xl mx-auto px-6 py-12 md:px-8 md:py-16">

        {/* Titre */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-black mb-8 text-center">
          Votre Panier
        </h1>

        {/* PANIER VIDE */}
        {cart.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <FaShoppingCart className="text-6xl text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl text-black font-bold mb-2">
              Votre panier est vide
            </h2>
            <p className="text-gray-500 mb-6">
              Ajoutez des produits pour commencer vos achats.
            </p>
            {/* Bouton retour produits */}
            <button
              onClick={() => router.push("/products")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Voir les produits
            </button>
          </div>
        ) : (
          <div className="space-y-6">

            {/* LISTE PRODUITS */}
            {cart.map((item) => {

              const errorKey = item.id + "-" + item.size;

              return (
                <div
                  key={errorKey}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-wrap md:flex-nowrap items-center justify-between gap-6 hover:shadow-lg transition"
                >
                  {/* IMAGE + NOM */}
                  <div className="flex items-center gap-6 w-full md:w-auto">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-black truncate">{item.name} ({item.size})</h2>

                      {/* STOCK RESTANT */}
                      <p className="text-gray-500 text-sm mt-1">
                        Stock restant : {item.stock - item.quantity}
                      </p>

                      {/* MESSAGE STOCK MAX */}
                      {errorItem === errorKey && (
                        <p className="text-red-500 text-sm font-semibold mt-1">
                          Stock maximum atteint
                        </p>
                      )}
                    </div>

                  </div>

                  {/* PRIX */}
                  <p className="text-blue-600 font-bold text-lg">
                    {item.price} FCFA
                  </p>

                  {/* QUANTITE */}
                  <div className="flex items-center gap-4 mt-4 md:mt-0">

                    <button
                      onClick={() => decreaseQty(item.id, item.size)}
                      className="bg-black text-white px-3 py-1 rounded-lg hover:bg-gray-800"
                    >
                      -
                    </button>

                    <span className="font-bold text-black text-lg">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item.id, item.size)}
                      className="bg-black text-white px-3 py-1 rounded-lg hover:bg-gray-800"
                    >
                      +
                    </button>

                  </div>
                </div>
              );
            })}

            {/* TOTAL */}
            <div className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center mt-8">

              <h2 className="text-2xl text-black font-bold">
                Total
              </h2>

              <p className="text-3xl text-blue-600 font-bold">
                {totalPrice} FCFA
              </p>

            </div>

            {/* BOUTON COMMANDER */}
            <div className="text-right mt-8">
              <button
                onClick={() => router.push("/checkout")}
                className="bg-green-600 text-white px-10 py-3 rounded-lg hover:bg-green-700 transition font-semibold text-lg"
              >
                Commander
              </button>
            </div>

          </div>
        )}

      </section>

    </div>
  );
}