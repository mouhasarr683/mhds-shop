/*
Produits avec stock par variante
*/

const products = [

{
  id: 1,
  name: "T-shirt Premium",
  price: 12000,
  description: "T-shirt premium confortable et stylé parfait pour toutes occasions.",
  image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",

  variants: [
    { size: "S", stock: 5 },
    { size: "M", stock: 3 },
    { size: "L", stock: 0 },
    { size: "XL", stock: 2 }
  ]
},

{
  id: 2,
  name: "Sneakers Modern",
  price: 25000,
  description: "Sneakers modernes très confortables idéales pour le sport ou la ville.",
  image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",

  variants: [
    { size: 40, stock: 3 },
    { size: 41, stock: 4 },
    { size: 42, stock: 2 },
    { size: 43, stock: 0 }
  ]
},

{
  id: 3,
  name: "Montre élégante",
  price: 30000,
  description: "Montre élégante avec design minimaliste parfaite pour un style chic.",
  image: "https://images.unsplash.com/photo-1511389026070-a14ae610a1be",

  variants: [
    { size: "Standard", stock: 6 }
  ]
}

];

export default products;