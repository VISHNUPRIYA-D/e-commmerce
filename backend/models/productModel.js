import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    product_name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number, required:true},
    image_url:{type:String, required:true},
    main_category:{type:String,required:true},
    subcategory:{type:String,required:true},
    brand:{type:String,required:true},
    sizes:{type:[String],default:[]},
    bestseller:{type:Boolean},
    date:{type:Number,default:Date.now}
})
const productModel = mongoose.models.product || mongoose.model("product",productSchema)
export default productModel;