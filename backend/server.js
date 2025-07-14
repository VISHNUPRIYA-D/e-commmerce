import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
 
//app Configuration
const app = express()
const port = process.env.PORT || 3500
connectDB()


//middelware
app.use(express.json()) // your backend understand JSON data sent from the frontend.
app.use(express.urlencoded({ extended: true }));
app.use(cors()) // This allows your frontend and backend to talk to each other, even if they’re on different ports 
app.use('/uploads',express.static('uploads'));
//API endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>console.log("SERVER IS RUNNING ON " +port))