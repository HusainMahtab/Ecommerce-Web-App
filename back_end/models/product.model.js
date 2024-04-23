import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Product Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true , "Please Write Descrition For Product"]
    },
    price:{
        type:String,
        required:[true,"please Enter product prince"],
        maxLength:[8,"price can not exceed 8 characters"]
    },
    ratings:{
       type:Number,
        default:0
    },
    image:[

     {
        public_id:{
        type:String,
        required:true
       },

       url:{
        type:String,
        required:true
       }
     }
       
    ],
    categoury:{
      type:String,
      required:[true,"please Enter Course Categoury"]
    },
    stock:{
        type:Number,
        required:[true,"please Enter product Stock"],
        maxLength:[4,"Stock can not exceed 4 character"],
        default:1
    },

    numOfReviews:{
        type:Number,
        default:0
    },

    reviews:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true
            },

            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],


},{timestamps:true})



export const Product=mongoose.model("Product",productSchema)