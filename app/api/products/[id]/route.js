/*
API PRODUIT UNIQUE
PUT → modifier
DELETE → supprimer
*/

import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";


/* =========================
MODIFIER PRODUIT
========================= */

export async function PUT(req, context){

try{

await connectDB();

const { id } = await context.params;

const body = await req.json();

const product = await Product.findByIdAndUpdate(

id,
body,
{ returnDocument:"after" }

);

return Response.json(product);

}catch(error){

console.log(error);

return Response.json(
{error:"Erreur modification"},
{status:500}
);

}

}


/* =========================
SUPPRIMER PRODUIT
========================= */

export async function DELETE(req, context){

try{

await connectDB();

const { id } = await context.params;

await Product.findByIdAndDelete(id);

return Response.json({
message:"Produit supprimé"
});

}catch(error){

console.log(error);

return Response.json(
{error:"Erreur suppression"},
{status:500}
);

}

}