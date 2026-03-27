import { v2 as cloudinary } from "cloudinary";

/* CONFIG CLOUDINARY */

cloudinary.config({
cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
api_key: process.env.CLOUDINARY_API_KEY,
api_secret: process.env.CLOUDINARY_API_SECRET
});


/* =========================
UPLOAD IMAGE
========================= */

export async function POST(req){

try{

const body = await req.json();

/* vérifier image */

if(!body.image){

return Response.json(
{error:"Image manquante"},
{status:400}
);

}

/* upload cloudinary */

const result = await cloudinary.uploader.upload(

body.image,

{
folder:"mhds-shop",
resource_type:"image"
}

);

/* réponse */

return Response.json({

url:result.secure_url

});

}catch(error){

console.log(error);

return Response.json(

{error:"Erreur upload image"},

{status:500}

);

}

}