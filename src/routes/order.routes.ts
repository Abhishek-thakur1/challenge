import express from "express";
import { validate } from "../middleware/validate";

import {
    createOrderHandler,
    getOrderByIdHandler,
    updateOrderHandler,
    updateOrderStatusHandler,
    getAllOrdersHandler,
    deleteOrderHandler,
} from '../controllers/order.controller'

import {
    createOrderSchema,
    getOrderSchema,
    updateOrderSchema,
    updateOrderStatusSchema,
    deleteOrderSchema,
} from "../schemas/order.schema";

const router = express.Router();

// adding order
router.route('/add').post(validate(createOrderSchema), createOrderHandler).get(getAllOrdersHandler);

router
    .route('/:orderId')
    .get(validate(getOrderSchema), getOrderByIdHandler)
    
// updation
router.route('/update/:orderId').patch(validate(updateOrderSchema), updateOrderHandler)

// update status
router.route('/updateStatus/:orderId').patch(validate(updateOrderStatusSchema), updateOrderStatusHandler)
    

// deleting order
router.route('/delete/:orderId').delete(validate(deleteOrderSchema), deleteOrderHandler);

export default router