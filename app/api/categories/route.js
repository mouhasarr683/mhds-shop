import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(){

await connectDB();

const categories = await Product.distinct("category");

return Response.json(categories);

}