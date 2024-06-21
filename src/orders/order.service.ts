import {Injectable, } from "@nestjs/common";
import { Cart, Coupon, Order } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CartService } from "./cart.service";

@Injectable()
export class OrderService{
    constructor(private prisma : PrismaService, private cartService : CartService){}

    async createOrder(cartId){
        var cart : Cart = await this.cartService.findCart(cartId)
        if(!cart)
            return "Cart doesn't exist"
        var available = await this.cartService.checkCart(cartId)
        if(!available)
            return "Out of stock."
        var userId = cart.userId
        var order = await this.prisma.order.create({
            data : {status : "Created", 
            userId : userId,
             cartId : cartId,
            total : cart.total}
        })
        cart.orderId = order.orderId
        await this.prisma.cart.update({where : {cartId : cart.cartId}, data : {orderId : order.orderId}})
        return "Ordered successfully"
    }

    async getOrder(orderID){
        var order : Order = await this.prisma.order.findUnique({where : {orderId : orderID}})
        if(!order)
            return "Order not found"
        return order;
    }
    async update(orderId, status){
        await this.prisma.order.update({
            where : {orderId : orderId},
            data : {status : status}
        })
        return "Updated successfully"
    }
    async userHistory(userId){
        return await this.prisma.order.findMany({
                where : {userId : userId},
                orderBy : {orderDate : 'desc'}
        })
    }
    async applyCoupon(coupon, orderId){
        var order : Order = await this.prisma.order.findUnique({where : {orderId: orderId}})
        if(!order)
            return "Invalid order"
        coupon = await this.prisma.coupon.findUnique({where : {coupon : coupon}})
        if(!coupon)
            return "Invalid coupon"
        
        var applied = await this.prisma.couponApplied.findFirst({
            where : {
                orderId : orderId,
                coupon : coupon.coupon
            }
    })
    if(applied)
        return "Coupon already applied"
    order.total *= 1-coupon.off/100
    await this.prisma.order.update({
            where : {orderId : order.orderId},
            data : {total : order.total}
        })
    await this.prisma.couponApplied.create({
        data : {
            coupon : coupon.coupon,
            orderId : orderId
        }
    })
    return "Coupon applied successfully"
    }
}