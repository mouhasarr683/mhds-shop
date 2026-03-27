import connectDB from "../../../../lib/mongodb";
import Order from "../../../../models/Order";


/* =====================
GET UNE COMMANDE
===================== */

export async function GET(req, context){

await connectDB();

const { id } = await context.params;

const order = await Order.findById(id);

return Response.json(order);

}


/* =====================
MODIFIER STATUT
===================== */

export async function PATCH(req, context){

await connectDB();

const body = await req.json();

const { id } = await context.params;

const order = await Order.findByIdAndUpdate(

id,
{ status: body.status },
{ new:true }

);

return Response.json(order);

}
export async function DELETE(req, context){

await connectDB();

const { id } = await context.params;

await Order.findByIdAndDelete(id);

return Response.json({success:true});

}