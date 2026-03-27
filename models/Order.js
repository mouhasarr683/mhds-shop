/*
MODEL COMMANDE
Structure des commandes client
*/

import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({

customerName:{
type:String,
required:true
},

phone:{
type:String,
required:true
},

city:{
type:String,
required:true
},

address:{
type:String,
required:true
},

items:[
{
productId:String,
name:String,
size:String,
price:Number,
quantity:Number
}
],

total:{
type:Number,
required:true
},

status:{
type:String,
default:"nouvelle"
},

createdAt:{
type:Date,
default:Date.now
}

});

export default mongoose.models.Order || mongoose.model("Order",OrderSchema);