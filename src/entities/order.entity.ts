import {Column, Entity} from 'typeorm'
import Model from './model.entity'

@Entity('orders')
export class Order extends Model {
    
    @Column()
    quantity: number

    @Column()
    pricePerUnit: number

    @Column()
    totalPrice: number

    @Column()
    deliveryAddress: string


    @Column()
    orderStatus: string
}