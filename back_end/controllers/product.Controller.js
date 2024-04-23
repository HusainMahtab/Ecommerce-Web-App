import {ApiError} from "../utils/apiError.js"
import {apiResponse} from "../utils/apiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {Product} from "../models/product.model.js"
import { Apifeatures } from "../utils/apifeatures.js"

// admin route
const createProduct=asyncHandler(async(req,res,next)=>{

    // req.body.user=req.user._id
    // console.log(req.user._id)
 
    const {name,description,price,image,stock,categoury}=req.body
    
    
    if((name==="" || description==="" || price==="" || image==="" || stock==="" || categoury==="")){
        throw new ApiError(500,"these filds are required !")
    }


    const createdProduct =await Product.create({
        name,
        description,
        price,
        image,
        stock,
        categoury,

    })

    if(!createProduct){
        throw new ApiError(404,"Product not created")
    }

    return res
    .status(200)
    .json(new apiResponse(200, createdProduct ,"Product created Successfully"))
})

// admin route
const updateProduct=asyncHandler(async(req,res,next)=>{
    
    const product=await Product.findById(req.params._id)
    console.log(product)
    if(!product){
        throw new ApiError(404,"product not found")
    }

    const {name,descreption,price,image,stock,categoury}=req.body

    if(!(name || descreption || price || image || stock || categoury)){
        throw new ApiError(500,"these filds are requred")
    }

    const updatedProduct=await Product.findByIdAndUpdate(product,req.body,{
        new:true,
        $set:[
            {name},{descreption},{price},{image},{stock},{categoury}
        ]
    }) 
    console.log(updateProduct);


    return res
    .status(200)
    .json(new apiResponse(200,updatedProduct,"Product updated Successfully"))
})

// delete product admin
const deleteProduct=asyncHandler(async(req,res,next)=>{
    const product=await Product.findById(req.params._id)
    if(!product){
        throw new ApiError(404,"Product not found !")
    }

   const deletedProduct= await Product.findByIdAndDelete(product)

   return res
   .status(200)
   .json(new apiResponse(200 ,deletedProduct,"Product deleted successfully"))
    
})

// get product details
const getProductDetails=asyncHandler(async(req,res,next)=>{
    const product=await Product.findById(req.params._id)

    if(!product){
        throw new ApiError(404,"Product not found")
    }

    return res
    .status(200)
    .json(new apiResponse(200,product,"Product found Successfully"))
})

// get all products
const getAllProducts=asyncHandler(async(req,res,next)=>{

    const resultPerPage=10;
    const productCount=await Product.countDocuments()
    
    const apiFeatures=new Apifeatures(Product.find(),req.query).search().filter().pagination(resultPerPage)
    
    const allProduct=await apiFeatures.query

    if(!allProduct){
        throw new ApiError(404,"Products not Found!")
    }

     return res
     .status(200)
     .json(new apiResponse(200,allProduct,productCount,"Success"))
})

// Create New Review or Update the Review
const create_product_review = asyncHandler(async(req, res) => {
    const { rating, comment, productId } = req.body;
    const reviews = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    };

    try {
        const product = await Product.findById(productId);
        console.log(product);

        const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());

        if (isReviewed) {
            product.reviews.forEach(rev => {
                if (rev.user.toString() === req.user._id.toString()) {
                    rev.rating = rating;
                    rev.comment = comment;
                }
            });
        } else {
            product.reviews.push(reviews); // Push into the reviews array within product
            product.numOfReviews=product.reviews.length
        }

        let avgRatings = 0;
        product.reviews.forEach(rev => {
            avgRatings += rev.rating;
        });
        product.ratings = avgRatings / product.reviews.length;

        await product.save({ validateBeforeSave: false });

        return res.status(200).json(new apiResponse(200, product, "Rating Submitted Successfully"));
    } catch (error) {
        // Handle any errors appropriately
        console.error(error);
        return res.status(500).json(new apiResponse(500, null, "Internal Server Error"));
    }
});

// Get all Reviews of a product
const getProductReviews=asyncHandler(async(req,res)=>{
     const product=await Product.findById(req.query._id)
     if(!product){
        throw new ApiError(404,`product does't exits with this Id:${req.query._id}`)
     }

     return res
     .status(200)
     .json(new apiResponse(200,{reviews:product.reviews},"Reviews find successfully"))
     
})

// Delete Review
const deleteReview=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.query.productId)

    if(!product){
        throw new ApiError(404,`product does't exist with this Id:${req.query.productId}`)
    }

    const reviews=product.reviews.filter((rev)=>rev._id.toString()!==req.query._id.toString())

    console.log("reviews",reviews)

    let avgRatings=0
    reviews.forEach((rev)=>{
        avgRatings+=rev.rating
    })

    const ratings=avgRatings/reviews.length

    const numOfReviews=reviews.length

    await Product.findByIdAndUpdate(
        req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews
      },
      {
        new:true,
        runValidators:true,
        useFindAndModify:false
      }
    )



    return res
    .status(200)
    .json(new apiResponse(200,{},"review Deleted Successfully"))
    
})





export{
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails,
    create_product_review,
    getProductReviews,
    deleteReview
}