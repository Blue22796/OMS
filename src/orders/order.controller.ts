import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CouponOrder } from './DTOs/update.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateOrderDto } from './DTOs/create.dto';
import { parse } from 'path';

@ApiTags('orders')
@Controller('api/orders')
export class OrderController {
  constructor(private service: OrderService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order successfully created' })
  @ApiResponse({ status: 400, description: 'Invalid cart ID' })
  async createOrder(@Body() order: CreateOrderDto) {
    if (!order.cartId) return 'Invalid id';
    return await this.service.createOrder(order.cartId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the order', type: Number })
  @ApiResponse({ status: 200, description: 'Order found' })
  @ApiResponse({ status: 400, description: 'Invalid order ID' })
  async getOrder(@Param('id') orderId) {
    orderId = parseInt(orderId)
    if (!orderId) return 'Invalid id';
    return await this.service.getOrder(orderId);
  }

  @Put(':id/:status')
  @ApiOperation({ summary: 'Update the status of an order' })
  @ApiParam({ name: 'id', description: 'The ID of the order', type: Number })
  @ApiParam({ name: 'status', description: 'The new status of the order', type: String })
  @ApiResponse({ status: 200, description: 'Order status updated' })
  @ApiResponse({ status: 400, description: 'Invalid order ID' })
  async updateOrder(@Param('id') orderId, @Param('status') status: string) {
    orderId = parseInt(orderId)
    if (!orderId) return 'Invalid id';
    return await this.service.update(orderId, status);
  }

  @Get('/history/:userId')
  @ApiOperation({ summary: 'Get the order history of a user' })
  @ApiParam({ name: 'userId', description: 'The ID of the user', type: Number })
  @ApiResponse({ status: 200, description: 'User order history retrieved' })
  @ApiResponse({ status: 400, description: 'Invalid user ID' })
  async orderHistory(@Param('userId') userId) {
    userId = parseInt(userId)
    if (!userId) return 'Invalid id';
    return this.service.userHistory(userId);
  }

  @Post('/apply-coupon')
  @ApiOperation({ summary: 'Apply a coupon to an order' })
  @ApiBody({ type: CouponOrder })
  @ApiResponse({ status: 200, description: 'Coupon applied' })
  @ApiResponse({ status: 400, description: 'Invalid order ID or coupon' })
  async applyCoupon(@Body() coupon: CouponOrder) {
    if (!coupon.orderId) return 'Invalid order';
    return await this.service.applyCoupon(coupon.coupon, coupon.orderId);
  }
}
