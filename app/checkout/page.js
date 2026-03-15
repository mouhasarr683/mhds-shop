"use client";

import { useCart } from "../../context/CartContext";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { FaTruck, FaMoneyBillWave } from "react-icons/fa";

export default function CheckoutPage() {

  const { cart } = useCart();

  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [phone,setPhone] = useState("");
  const [email,setEmail] = useState("");
  const [address,setAddress] = useState("");
  const [city,setCity] = useState("");

  const deliveryFee =
    city === "dakar" ? 2000 :
    city === "hors_dakar" ? 3000 :
    0;

  const totalProducts = cart.reduce(
    (total,item)=> total + item.price * item.quantity,
    0
  );

  const total = totalProducts + deliveryFee;

  /*
  ENVOI COMMANDE WHATSAPP
  */

  const handleOrder = () => {

    if(!firstName || !lastName || !phone || !address || !city){
      alert("Veuillez remplir les informations importantes");
      return;
    }

    let message = "🛒 Nouvelle commande MHDS SHOP%0A%0A";

    message += "*Client*%0A";
    message += `Prénom: ${firstName}%0A`;
    message += `Nom: ${lastName}%0A`;
    message += `Téléphone: ${phone}%0A`;
    message += `Email: ${email}%0A`;
    message += `Adresse: ${address}%0A`;
    message += `Zone: ${city}%0A%0A`;

    message += "*Produits*%0A";

    cart.forEach((item)=>{

      message += `${item.name} (${item.size}) x${item.quantity} - ${item.price * item.quantity} FCFA%0A`;

    });

    message += `%0ASous-total: ${totalProducts} FCFA`;
    message += `%0ALivraison: ${deliveryFee} FCFA`;
    message += `%0ATotal: ${total} FCFA`;

    const phoneNumber = "221774865299";

    const url = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(url,"_blank");

  };

  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar/>

      <section className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16 grid md:grid-cols-2 gap-10">

        {/* FORMULAIRE CLIENT */}

        <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">

          <h2 className="text-2xl font-bold text-black mb-6">
            Informations Client
          </h2>

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Prénom"
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)}
              className="w-full text-black border p-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="Nom"
              value={lastName}
              onChange={(e)=>setLastName(e.target.value)}
              className="w-full text-black border p-3 rounded-lg"
            />

            <input
              type="tel"
              placeholder="Téléphone"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              className="w-full text-black border p-3 rounded-lg"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full text-black border p-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="Adresse complète"
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
              className="w-full text-black border p-3 rounded-lg"
            />

            {/* ZONE LIVRAISON */}

            <div>

              <p className="text-black font-semibold mb-3">
                Zone de livraison
              </p>

              <div className="flex gap-3 flex-wrap">

                <button
                  type="button"
                  onClick={()=>setCity("Dakar")}
                  className={`px-4 py-2 rounded-lg border ${
                    city==="Dakar"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-black"
                  }`}
                >
                  Dakar
                </button>

                <button
                  type="button"
                  onClick={()=>setCity("Hors Dakar")}
                  className={`px-4 py-2 rounded-lg border ${
                    city==="Hors Dakar"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-black"
                  }`}
                >
                  Hors Dakar
                </button>

              </div>

            </div>

          </div>

        </div>


        {/* RECAP COMMANDE */}

        <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">

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
                  key={item._id + item.size}
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

          {/* BOUTONS */}

          <div className="mt-8 space-y-3">

            <button
              onClick={handleOrder}
              className="w-full flex items-center justify-center gap-3 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
            >

              <FaTruck/>

              Commander via WhatsApp

            </button>

          </div>

        </div>

      </section>

    </div>

  );

}