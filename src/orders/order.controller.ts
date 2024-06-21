import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { OrderService } from "./order.service";
import { stat } from "fs";

@Controller('api/orders')
export class OrderController{
    constructor(private service : OrderService){}

    @Post('/')
    async createOrder(@Body() cartId){
        cartId = parseInt(cartId.value)
        if(!cartId)
            return "Invalid id"
        return await this.service.createOrder(cartId)
    }

    @Get(':id')
    async getOrder(@Param('id') orderId){
        console.log(orderId)
        orderId = parseInt(orderId)
        if(!orderId)
            return "Invalid id"
        return await this.service.getOrder(orderId)

    }

    @Put(':id/:status')
    async updateOrder(@Param('id') orderId, @Param('status') status){
        orderId = parseInt(orderId)
        if(!orderId)
            return "Invalid id" 
        return await this.service.update(orderId, status)
    }
    @Get('/history/:userId')
    async orderHistory(@Param('userId') userId){
        userId = parseInt(userId)
        if(!userId)
            return "Invalid id"
        return this.service.userHistory(userId)
    }
    @Post('/apply-coupon')
    async applyCoupon(@Body() coupon){
        var orderId = parseInt(coupon.order)
        if(!orderId)
            return "Invalid order"
        return await this.service.applyCoupon(coupon.coupon, orderId)
    }
}