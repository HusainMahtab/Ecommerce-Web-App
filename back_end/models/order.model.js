import mongoose from "mongoose"


const orderSchema=new mongoose.Schema(
    {
       shippingInfo:{
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String
        },
        country:{
            type:String
        },
        pinCode:{
            type:Number,
            required:true
        },
        phoneNumber:{
            type:String,
            required:true
        }
       },
       orderItems:[
        {
            name:{
            type:String,
            required:true
        },
        quntity:{
            type:Number,
            required:true,
            default:1
        },
        price:{
            type:Number,
            required:true
        },
        color:{
            type:String,
        },
        image:{
            type:String,
            required:true
        },
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true
        } 

        }
       
    ],

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    paymentInfo:{
        id:{
            type:String,
            required:true
        },
        status:{
            type:String,
            required:true
        }
    },
    paidAt:{
        type:Date,
        required:true
    },
    itemsPrice:{
        type:Number,
        required:true,
        default:0
    },
    taxPrice:{
        type:Number,
        required:true,
        default:0
    },
    shippingPrice:{
        type:Number,
        required:true,
        default:0
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0
    },
    orderStatus:{
        type:String,
        required:true,
        default:"Processing"
    },
    deliveredAt:{
        type:Date
    }

    },
    {timestamps:true}
    )

    export const Order=mongoose.model("Order",orderSchema)