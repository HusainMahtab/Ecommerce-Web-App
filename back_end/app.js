import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
const app=express()

app.use(express.json())

app.use(cookieParser())

app.use(cors({
    origin:"*",
    credentials:true
}));

//import product routes 
import productRouter from "./routes/product.Routes.js"
app.use("/api/v1",productRouter);

// import user routes
import userRouter from "./routes/user.Routes.js"
app.use("/api/v1/users/",userRouter)

// import oder routes
import order from "./routes/oder.Routes.js"
app.use("/api/v1/order/",order)

export {app}