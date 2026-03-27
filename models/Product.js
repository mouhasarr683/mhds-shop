import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema({

  size:{
    type:String,
    required:true
  },

  color:{
    type:String, // 🔥 PRET POUR COULEUR
    default:null
  },

  stock:{
    type:Number,
    required:true,
    default:0
  }

});

const ProductSchema = new mongoose.Schema({

  name:{
    type:String,
    required:true
  },

  description:String,

  price:{
    type:Number,
    required:true
  },

  image:{
    type:String,
    required:true
  },

  category:String,

  variants:{
    type:[VariantSchema],
    default:[]
  },

  totalStock:{
    type:Number,
    default:0
  },

  discount:{
    type:Number,
    default:0
  },

  promoStart:Date,
  promoEnd:Date,

  bestSeller:{
    type:Boolean,
    default:false
  },

  isNewProduct:{
    type:Boolean,
    default:true
  }

},{
  timestamps:true
});

export default mongoose.models.Product ||
mongoose.model("Product",ProductSchema);