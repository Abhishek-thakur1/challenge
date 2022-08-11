import { Request } from "express";
import {
    FindOptionsRelations,
    FindOptionsSelect,
    FindOptionsWhere,
    getRepository,
} from "typeorm";
import { Order } from '../entities/order.entity'
import {AppDataSource} from '../utils/data-source'

const orderRepository = AppDataSource.getRepository(Order)

export const createOrder = async (input: Partial<Order>) => {
    return await orderRepository.save(orderRepository.create({...input}))
}

export const getOrderById = async (orderId: string) => {
    return await orderRepository.findOneBy({ id: orderId})
}

export const getAllOrders = async (req: Request) => {
    const builder = orderRepository.createQueryBuilder('post');

    if (req.query.search) {
        builder.where('order.title LIKE :search OR order.content LIKE :search', {
            search: `%${req.query.search}%`,
        });
    }

    if (req.query.sort) {
        const sortQuery = req.query.sort === '-price' ? 'DESC' : 'ASC';
        builder.orderBy('order.title', sortQuery);
    }

    return await builder.getMany();
};


