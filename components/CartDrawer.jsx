"use client";

import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function CartDrawer({ isOpen, onClose }) {

  const { cart, increaseQty, decreaseQty, errorItem } = useCart();
  const router = useRouter();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-[90%] md:w-[400px] bg-white z-50 shadow-2xl transform transition duration-300 flex flex-col
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >

        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <FaShoppingCart /> Panier
          </h2>

          <button onClick={onClose}>
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* CONTENU */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {cart.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              Panier vide
            </p>
          ) : (
            cart.map((item) => {

              const errorKey = item._id + "-" + item.size;

              return (
                <div key={errorKey} className="flex gap-4 border-b pb-4">

                  <img
                    src={item.image}
                    className="w-16 h-16 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">
                      {item.name}
                    </h3>

                    <p className="text-xs text-gray-500">
                      Taille: {item.size}
                    </p>

                    <p className="text-blue-600 font-bold text-sm">
                      {item.price} FCFA
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decreaseQty(item._id, item.size)}
                        className="px-2 bg-gray-200 rounded"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => increaseQty(item._id, item.size)}
                        className="px-2 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>

                    {errorItem === errorKey && (
                      <p className="text-red-500 text-xs mt-1">
                        Stock max atteint
                      </p>
                    )}
                  </div>

                </div>
              );
            })
          )}

        </div>

        {/* FOOTER */}
        {cart.length > 0 && (
          <div className="p-4 border-t space-y-3">

            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>{totalPrice} FCFA</span>
            </div>

            <button
              onClick={() => {
                onClose();
                router.push("/checkout");
              }}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
            >
              Commander
            </button>

            <button
              onClick={() => {
                onClose();
                router.push("/cart");
              }}
              className="w-full border py-2 rounded-lg"
            >
              Voir panier
            </button>

          </div>
        )}

      </div>
    </>
  );
}