import express from 'express';
import { allOrders, PlaceOrderCOD, PlaceOrderStripe, updateStatus, userOrders, verifyStripe } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js';
const orderRouter = express.Router();

//admin 
orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus);

//payment
orderRouter.post('/cash',authUser,PlaceOrderCOD);
orderRouter.post('/stripe',authUser,PlaceOrderStripe);

//user
orderRouter.post('/userorders',authUser,userOrders)

//verify payment
orderRouter.post('/verifyStripe',authUser,verifyStripe)

export default orderRouter;



