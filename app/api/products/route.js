import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(req){

await connectDB();

const {searchParams} = new URL(req.url);

const search = searchParams.get("search");
const category = searchParams.get("category");
const minPrice = searchParams.get("minPrice");
const maxPrice = searchParams.get("maxPrice");

let query = {};

/* RECHERCHE TEXTE */

if(search){

query.name = {
$regex:search,
$options:"i"
};

}

/* FILTRE CATEGORIE */

if(category){

query.category = category;

}

/* FILTRE PRIX */

if(minPrice || maxPrice){

query.price = {};

if(minPrice) query.price.$gte = Number(minPrice);
if(maxPrice) query.price.$lte = Number(maxPrice);

}

const products = await Product.find(query)
.sort({createdAt:-1});

return Response.json(products);

}


/* CREATE PRODUCT */

export async function POST(req){

await connectDB();

const body = await req.json();

const totalStock = body.variants.reduce(
(total,v)=> total + v.stock,
0
);

body.totalStock = totalStock;

const product = await Product.create(body);

return Response.json(product);

}