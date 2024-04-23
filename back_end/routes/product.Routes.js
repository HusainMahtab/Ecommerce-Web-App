import {Router} from "express"

import { 
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails,
    create_product_review,
    getProductReviews,
    deleteReview 
} 
from "../controllers/product.Controller.js"

import {isAuthenticatedUser,authorizeRole} from "../middlewares/auth.middleware.js"

const router=Router()

router.route("/products").get(getAllProducts)

router.route("/product/new").post(isAuthenticatedUser,authorizeRole("admin"),createProduct)

router.route("/product/update/:_id").put(isAuthenticatedUser,authorizeRole("admin"),updateProduct )

router.route("/product/delete/:_id").delete(isAuthenticatedUser,authorizeRole("admin"),deleteProduct) 

router.route("/products/get_product_details/:_id").get(getProductDetails)

// for reviews
router.route("/product/review").put(isAuthenticatedUser,create_product_review)

// get all reviews
router.route("/product/allReviews/").get(isAuthenticatedUser,getProductReviews)

// delete Review
router.route("/product/delete_review/").delete(isAuthenticatedUser,deleteReview)

export default router



