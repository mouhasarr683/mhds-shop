import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(){

await connectDB();

const orders = await Order.find();

/* TOTAL VENTES */

let totalSales = 0;

orders.forEach(order=>{
totalSales += order.total;
});

/* NOMBRE COMMANDES */

const totalOrders = orders.length;

/* PRODUITS VENDUS */

let productsMap = {};

orders.forEach(order=>{

order.items.forEach(item=>{

if(!productsMap[item.name]){

productsMap[item.name] = 0;

}

productsMap[item.name] += item.quantity;

});

});

/* TRANSFORMER EN TABLEAU */

const productsArray = Object.entries(productsMap).map(([name,qty])=>({

name,
qty

}));

/* TRI TOP PRODUITS */

productsArray.sort((a,b)=> b.qty - a.qty);

/* TOP 5 */

const topProducts = productsArray.slice(0,5);

return Response.json({

totalSales,
totalOrders,
topProducts

});

}