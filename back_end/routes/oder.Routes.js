import {Router} from "express"
const router=Router()

import {authorizeRole, isAuthenticatedUser} from "../middlewares/auth.middleware.js"

import { 
    newOrder,
    getSingleOrder,
    myOrders,
    getAll_orders,
    updateOrderStatus,
    delteOrder
} from "../controllers/order.controller.js"


// Order Routes
router.route("/new_order").post(isAuthenticatedUser,newOrder)

router.route("/single_order/:_id").get(isAuthenticatedUser,getSingleOrder)

router.route("/my_order").get(isAuthenticatedUser,myOrders)

router.route("/admin/all_orders").get(isAuthenticatedUser,authorizeRole("admin"),getAll_orders)

router.route("/admin/order_status/:_id").put(isAuthenticatedUser,authorizeRole("admin"),updateOrderStatus)

router.route("/admin/delete_order/:_id").delete(isAuthenticatedUser,authorizeRole("admin"), delteOrder)

export default router