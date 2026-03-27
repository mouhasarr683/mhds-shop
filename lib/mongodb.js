/*
Connexion MongoDB
Ce fichier permet de connecter Next.js à MongoDB
*/

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Veuillez définir MONGODB_URI dans .env.local");
}

/*
Cache connexion pour éviter
plusieurs connexions en développement
*/

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function connectDB() {

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {

    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });

  }

  cached.conn = await cached.promise;

  return cached.conn;

}