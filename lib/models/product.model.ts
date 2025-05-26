import mongoose from "mongoose";

const productSchema =  new mongoose.Schema({
    url: {type: String, required: true, unique : true},
    title:{ type : String, required: true },
    currency:{type : String, required: true},
    image : {type: String , required: true},
    currentPrice: {type: Number, required: true},
    realPrice: {type :Number, required: true},
    lowestPrice: {type: Number},
    highestPrice: {type: Number},
    discountRate: {type: Number},
    isOutOfStock: {type: Boolean, default: false},
}, {timestamps:true});

const Product = mongoose.models.Product || mongoose.model('Product',productSchema);

export default Product;