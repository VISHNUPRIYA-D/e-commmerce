import express from 'express'
import { addProduct,listProduct,removeProduct,singleProduct } from '../controllers/productController.js'
import adminAuth from '../middleware/adminAuth.js';
import multer from "multer"

const productRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({storage:storage});

productRouter.post('/add',adminAuth,upload.single("image_url"),addProduct);
productRouter.post('/single',adminAuth,singleProduct)
productRouter.get('/list',listProduct)
productRouter.post('/remove',removeProduct)


export default productRouter