"use client";

import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";

export default function CartPage(){

  const { cart, increaseQty, decreaseQty } = useCart();
  const router = useRouter();

  const totalPrice = cart.reduce(
    (total,item)=> total + item.price * item.quantity,
    0
  );

  return(

    <div className="bg-gray-100 min-h-screen">

      <Navbar/>

      <section className="max-w-7xl mx-auto px-6 py-12">

        <h1 className="text-3xl font-bold mb-8 text-center">
          Votre Panier
        </h1>

        {cart.length === 0 ? (

          <div className="bg-white p-8 rounded-xl shadow text-center">

            <FaShoppingCart className="text-5xl mx-auto mb-4 text-gray-400"/>

            <p className="mb-4">
              Panier vide
            </p>

            <button
              onClick={()=>router.push("/products")}
              className="bg-blue-600 text-white px-6 py-2 rounded"
            >
              Voir produits
            </button>

          </div>

        ) : (

          <div className="space-y-6">

            {cart.map(item=>(

              <div
                key={item._id + item.size}
                className="bg-white p-4 rounded-xl flex justify-between items-center"
              >

                <div className="flex items-center gap-4">

                  <img
                    src={item.image}
                    className="w-20 h-20 object-cover rounded"
                  />

                  <div>

                    <p className="font-bold">
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Taille : {item.size}
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <button
                    onClick={()=>decreaseQty(item._id,item.size)}
                  >-</button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={()=>increaseQty(item._id,item.size)}
                  >+</button>

                </div>

                <p className="font-bold">
                  {item.price * item.quantity} FCFA
                </p>

              </div>

            ))}

            <div className="text-right font-bold text-xl">
              Total : {totalPrice} FCFA
            </div>

          </div>

        )}

      </section>

    </div>
  )
}