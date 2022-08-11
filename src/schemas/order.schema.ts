import { object, string, number, TypeOf } from "zod"

export const createOrderSchema = object({
    body: object({
        quantity: number({
            required_error: 'Order should have a quantity'
        }),
        pricePerUnit: number({
            required_error: 'Item should have a price'
        }),
        totalPrice: number({
            required_error: 'Order should have a total price'
        }),
        deliveryAddress: string({
            required_error: 'Order should have a address'
        }),
        orderStatus: string({
            required_error: 'Order status is required!'
        })
    })
})


const params = {
    params: object({
        orderId: string(),

    })
}

export const getOrderSchema = object({ ...params })

export const updateOrderSchema = object({
    ...params,
    body: object({
        quantity: number(),
        pricePerUnit: number(),
        totalPrice: number(),
        deliveryAddress: string(),
        orderStatus: string(),
    }).partial()
})

export const updateOrderStatusSchema = object({
    ...params,
    body: object({
        
        orderStatus: string(),
    }).partial()
})


export const deleteOrderSchema = object({ ...params })

export type CreateOrderInput = TypeOf<typeof createOrderSchema>['body']
export type GetOrderInput = TypeOf<typeof getOrderSchema>['params']
export type UpdateOrderInput = TypeOf<typeof updateOrderSchema>
export type UpdateOrderStatusInput = TypeOf<typeof updateOrderStatusSchema>
export type DeleteOrderInput = TypeOf<typeof deleteOrderSchema>['params']