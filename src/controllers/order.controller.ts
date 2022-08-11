import { NextFunction, Response, Request } from "express";
import {
    CreateOrderInput,
    GetOrderInput,
    UpdateOrderInput,
    UpdateOrderStatusInput,
    DeleteOrderInput,
} from "../schemas/order.schema";
                                                                                            
import { createOrder, getOrderById, getAllOrders } from '../services/order.service'
import AppError from '../utils/appError'


// create order
export const createOrderHandler = async(
    req: Request<{}, {}, CreateOrderInput>,
    res: Response, 
    next: NextFunction
) => {
    try {
        const order = await createOrder(req.body)

        res.status(201).json({
            status: 'success',
            data: {
                order
            }
        })
    } catch (err: any) {
        if (err.code === '23505') {
            return res.status(409).json({ 
                status: 'fail',
                message: err.message
            })
        }
        next(err);
    }
}

// get order by ID
export const getOrderByIdHandler = async(
    req: Request<GetOrderInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const order = await getOrderById(req.params.orderId);

        if (!order) return next(new AppError(404, 'Product with that ID doesn\'t exist'));

        res.status(200).json({
            status: 'success',
            data: {
                order
            }
        })

    } catch (err: any) {
        next(err)
    }
}

// get all orders
export const getAllOrdersHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const orders = await getAllOrders(req);

        res.status(200).json({
            status: 'success',
            results: orders.length,
            data: {
                orders,
            },
        });
    } catch (err: any) {
        next(err);
    }
};

// update order status
export const updateOrderStatusHandler = async (
    req: Request<UpdateOrderStatusInput['params'], {}, UpdateOrderStatusInput['body']>,
    res: Response,
    next: NextFunction
) => {
    try {
        const order = await getOrderById(req.params.orderId);

        if (!order) {
            return next(new AppError(404, 'order with that ID not found'));
        }

        Object.assign(order, req.body);

        const updatedOrderStatus = await order.save();

        res.status(200).json({
            status: 'success',
            data: {
                order: updatedOrderStatus,
            },
        });
    } catch (err: any) {
        next(err);
    }
};
// update order 
export const updateOrderHandler = async (
    req: Request<UpdateOrderInput['params'], {}, UpdateOrderInput['body']>,
    res: Response,
    next: NextFunction
) => {
    try {
        const order = await getOrderById(req.params.orderId);

        if (!order) {
            return next(new AppError(404, 'order with that ID not found'));
        }

        Object.assign(order, req.body);

        const updatedOrder = await order.save();

        res.status(200).json({
            status: 'success',
            data: {
                order: updatedOrder,
            },
        });
    } catch (err: any) {
        next(err);
    }
};


// delete order
export const deleteOrderHandler = async (
    req: Request<DeleteOrderInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const product = await getOrderById(req.params.orderId);

        if (!product) {
            return next(new AppError(404, 'order with that ID not found'));
        }

        await product.remove();

        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err: any) {
        next(err);
    }
};
