import { Order } from "../models/order.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import {apiResponse} from "../utils/apiResponse.js"
import {Product} from "../models/product.model.js"
// Creating new order
const newOrder=asyncHandler(async(req,res)=>{
   const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
    }=req.body
 
    const order=await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    })

    return res
    .status(200)
    .json(new apiResponse(200,order,"Order booked Successfully"))


})

// Get Single Order
const getSingleOrder=asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params._id).populate(
        "user",
        "name email"
    )
    if(!order){
        throw new ApiError(404,"order not found this Id",)
    }
    
    return res
    .status(200)
    .json(new apiResponse(200,order,"Order found Successfully"))
})

// get loggedIn user's order
const myOrders=asyncHandler(async(req,res)=>{
    const orders=await Order.find({user:req.user._id})
    
    if(!orders){
        throw new ApiError(404,"Your order is not found, Please order first")
    }
    
    return res
    .status(200)
    .json(new apiResponse(200,orders,"Order found Successfully"))
})

// get all_orders ---Admin
const getAll_orders=asyncHandler(async(req,res)=>{
    const order=await Order.find()
    if(!order){
        throw new ApiError(404,"Orders does't found")
    }

    let totalAmmount=0;
    order.forEach((order)=>{
        totalAmmount+=order.totalPrice
    })
    return res
    .status(200)
    .json(new apiResponse(200,{order,totalAmmount},"Orders found Successfully"))
})

// update order Status  --Admin
const updateOrderStatus=asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params._id)

    if(!order){
        throw new apiError(404,"your order is not found")
    }

    if(order.orderStatus==="Delivered"){
        throw new ApiError(400,"you have already delivered this order")
    }

    order.orderItems.forEach(async (order)=>{
        await updateStock(order.product,order.quntity)
    })

    order.orderStatus=req.body.status;

    if(req.body.status==="Delivered"){
        order.deliveredAt=Date.now()
    }

    await order.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(new apiResponse(200,{order},"this is currecnt satatus of your order"))
})

async function updateStock(_id,quantity){
     const product=await Product.findById(_id)
     product.stock=product.stock-quantity
     product.save({validateBeforeSave:false})
}

// delete Order  --Admin
const delteOrder=asyncHandler(async(req,res)=>{
    const order=await Order.findByIdAndDelete(req.params._id)
    if(!order){
        throw new ApiError(404,"product not found this Id")
    }

    return res
    .status(200)
    .json(new apiResponse(200,{},"Order deleted Successfully"))

})

export {
    newOrder,
    getSingleOrder,
    myOrders,
    getAll_orders,
    updateOrderStatus,
    delteOrder
}

