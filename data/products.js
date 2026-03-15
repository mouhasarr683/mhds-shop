const products = [

  {
    _id: "1",
    name: "T-shirt Premium",
    price: 12000,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    description: "T-shirt confortable et stylé pour tous les jours.",
    variants: [
      { size: "S", stock: 5 },
      { size: "M", stock: 3 },
      { size: "L", stock: 2 },
    ],
  },

  {
    _id: "2",
    name: "Sneakers Urban",
    price: 35000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    description: "Sneakers modernes parfaites pour un style urbain.",
    variants: [
      { size: "40", stock: 4 },
      { size: "41", stock: 3 },
      { size: "42", stock: 2 },
      { size: "43", stock: 1 },
    ],
  },

  {
    _id: "3",
    name: "Casquette Street",
    price: 8000,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b",
    description: "Casquette tendance pour compléter votre style.",
    variants: [
      { size: "Unique", stock: 6 },
    ],
  },

  {
    _id: "4",
    name: "Hoodie Fashion",
    price: 22000,
    image: "https://images.unsplash.com/photo-1601063476271-a159c71ab0b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvb2RpZXxlbnwwfHwwfHx8MA%3D%3D",
    description: "Hoodie chaud et confortable pour toutes les saisons.",
    variants: [
      { size: "M", stock: 3 },
      { size: "L", stock: 2 },
      { size: "XL", stock: 1 },
    ],
  }

];

export default products;