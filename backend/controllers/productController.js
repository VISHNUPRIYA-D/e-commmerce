import productModel from '../models/productModel.js'
//function for add product
const addProduct = async (req, res) => {
  try {
    const {
      product_name,
      description,
      price,
      main_category,
      subcategory,
      brand,
      sku,
      bestseller,
      sizes
    } = req.body;

    const image_url = req.file ? req.file.originalname : "";

    // ✅ Parse and flatten sizes
    let parsedSizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;
    parsedSizes = Array.isArray(parsedSizes) ? parsedSizes.flat(Infinity) : [];

    const newProduct = new productModel({
      product_name,
      description,
      price: Number(price),
      main_category,
      subcategory,
      brand,
      sku,
      image_url,
      bestseller: bestseller === "true",
      sizes: parsedSizes
    });

    const saved = await newProduct.save();
    res.json({ success: true, product: saved });

  } catch (error) {
    console.error("Error in addProduct:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


//function for list product
const listProduct = async(req,res) => {
    try {
      const products = await productModel.find({});
      res.json({success:true,products})
    } catch (error) {
      console.log(error);
      res.json({success:false,message:error.message})
      
    }
}

//function for remove product
const removeProduct = async(req,res) => {
    try{
      await productModel.findByIdAndDelete(req.body.id)
      res.json({success:true,message:"product removed successfully"})
    }catch(error){
      console.log(error);
      res.json({success:false,message:error.message})
    }
}

//function for single product
const singleProduct = async(req,res) => {
    try {
      const {productId} = req.body
      const product = await productModel.findById(productId)
      res.json({success:true,product})
    } catch (error) {
      console.log(error);
      res.json({success:false,message:error.message})
      
    }
}

export {listProduct,addProduct,removeProduct,singleProduct}