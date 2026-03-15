"use client";

/*
ADMIN PANEL MHDS SHOP
Ajoute un produit dans la base de données
*/

import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function AdminPage() {

  const [name,setName] = useState("");
  const [price,setPrice] = useState("");
  const [description,setDescription] = useState("");
  const [image,setImage] = useState("");

  const [loading,setLoading] = useState(false);
  const [message,setMessage] = useState("");

  const handleAddProduct = async () => {

    if(!name || !price || !image){
      setMessage("Veuillez remplir les champs obligatoires");
      return;
    }

    setLoading(true);
    setMessage("");

    const newProduct = {

      name,
      price:Number(price),
      description,
      image,

      variants:[
        {size:"S",stock:5},
        {size:"M",stock:5},
        {size:"L",stock:5}
      ]

    };

    try{

      const res = await fetch("/api/products",{

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify(newProduct)

      });

      if(res.ok){

        setMessage("Produit ajouté avec succès");

        setName("");
        setPrice("");
        setDescription("");
        setImage("");

      }else{

        setMessage("Erreur lors de l'ajout du produit");

      }

    }catch(error){

      setMessage("Erreur serveur");

    }

    setLoading(false);

  };

  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar/>

      <section className="max-w-4xl mx-auto px-6 py-16">

        <h1 className="text-4xl text-black font-bold mb-10">
          Admin Panel
        </h1>

        <div className="bg-white p-8 rounded-xl shadow-md space-y-4">

          <input
            type="text"
            placeholder="Nom du produit"
            className="w-full border p-3 rounded-lg text-black"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Prix"
            className="w-full border p-3 rounded-lg text-black"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
          />

          <textarea
            placeholder="Description"
            className="w-full border p-3 rounded-lg text-black"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
          />

          <input
            type="text"
            placeholder="URL image"
            className="w-full border p-3 rounded-lg text-black"
            value={image}
            onChange={(e)=>setImage(e.target.value)}
          />

          <button

            onClick={handleAddProduct}

            disabled={loading}

            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"

          >

            {loading ? "Ajout en cours..." : "Ajouter produit"}

          </button>

          {message && (

            <p className="text-center text-sm text-green-600">
              {message}
            </p>

          )}

        </div>

      </section>

    </div>

  )

}