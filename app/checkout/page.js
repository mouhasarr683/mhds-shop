"use client";

/*
PAGE CHECKOUT MHDS SHOP
Fonctions :
- formulaire client
- choix ville (Dakar / Hors Dakar)
- calcul livraison dynamique
- recap commande
*/

import { useCart } from "../../context/CartContext";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { FaTruck, FaMoneyBillWave } from "react-icons/fa";

export default function CheckoutPage() {

  const { cart } = useCart();

  const [city,setCity] = useState("");

  /*
  Calcul livraison
  */

  const deliveryFee =
    city === "dakar" ? 2000 :
    city === "hors_dakar" ? 3000 :
    0;

  /*
  Calcul total produits
  */

  const totalProducts = cart.reduce(
    (total,item)=> total + item.price * item.quantity,
    0
  );

  const total = totalProducts + deliveryFee;

  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">

        {/* ================= */}
        {/* FORMULAIRE CLIENT */}
        {/* ================= */}

        <div className="bg-white p-8 rounded-xl shadow-md">

          <h2 className="text-2xl font-bold text-black mb-6">
            Informations Client
          </h2>

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Prénom"
              className="w-full text-black border p-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="Nom"
              className="w-full text-black border p-3 rounded-lg"
            />

            <input
              type="tel"
              placeholder="Téléphone"
              className="w-full text-black border p-3 rounded-lg"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full text-black border p-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="Adresse complète"
              className="w-full text-black border p-3 rounded-lg"
            />

          </div>

          {/* ================= */}
          {/* CHOIX VILLE */}
          {/* ================= */}

          <div className="mt-6">

            <p className="text-black font-semibold mb-3">
              Zone de livraison
            </p>

            <div className="flex gap-3">

              <button
                onClick={()=>setCity("dakar")}
                className={`px-4 py-2 rounded-lg border ${
                  city === "dakar"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-black"
                }`}
              >
                Dakar
              </button>

              <button
                onClick={()=>setCity("hors_dakar")}
                className={`px-4 py-2 rounded-lg border ${
                  city === "hors_dakar"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-black"
                }`}
              >
                Hors Dakar
              </button>

            </div>

          </div>

        </div>


        {/* ================= */}
        {/* RECAP COMMANDE */}
        {/* ================= */}

        <div className="bg-white p-8 rounded-xl shadow-md">

          <h2 className="text-2xl text-black font-bold mb-6">
            Récapitulatif de la commande
          </h2>

          {cart.length === 0 ? (

            <p className="text-gray-500">
              Votre panier est vide
            </p>

          ) : (

            <div className="space-y-4">

              {cart.map((item)=>(

                <div
                  key={item.id + item.size}
                  className="flex justify-between border-b pb-2"
                >

                  <p className="text-black">
                    {item.name} ({item.size}) x {item.quantity}
                  </p>

                  <p className="text-black font-semibold">
                    {item.price * item.quantity} FCFA
                  </p>

                </div>

              ))}

            </div>

          )}

          <hr className="my-6"/>

          <div className="flex justify-between text-black mb-2">
            <p>Sous-total</p>
            <p>{totalProducts} FCFA</p>
          </div>

          <div className="flex justify-between text-black mb-2">
            <p>Livraison</p>
            <p>{deliveryFee} FCFA</p>
          </div>

          <div className="flex justify-between mt-4">

            <p className="text-xl text-black font-bold">
              Total
            </p>

            <p className="text-xl text-blue-600 font-bold">
              {total} FCFA
            </p>

          </div>

          {/* ================= */}
          {/* PAIEMENT */}
          {/* ================= */}

          <div className="mt-8 space-y-3">

            <button className="w-full flex items-center justify-center gap-3 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition font-semibold">

              <FaMoneyBillWave/>

              Payer avec Wave / Orange Money

            </button>

            <button className="w-full flex items-center justify-center gap-3 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold">

              <FaTruck/>

              Paiement à la livraison

            </button>

          </div>

        </div>

      </section>

    </div>

  );
}