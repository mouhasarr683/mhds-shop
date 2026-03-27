import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";

/* ======================
GET COMMANDES
====================== */

export async function GET(){

await connectDB();

const orders = await Order.find().sort({createdAt:-1});

return Response.json(orders);

}


/* ======================
CREER COMMANDE
====================== */

export async function POST(req){

await connectDB();

const body = await req.json();

/* enregistrer commande */

const order = await Order.create(body);


/* ======================
DIMINUER LE STOCK
====================== */

for(const item of body.items){

const product = await Product.findById(item.productId);

if(!product) continue;

/* trouver la variante */

const variant = product.variants.find(
v => v.size === item.size
);

if(variant){

variant.stock -= item.quantity;

if(variant.stock < 0){
variant.stock = 0;
}

}

await product.save();

}

return Response.json(order);

}