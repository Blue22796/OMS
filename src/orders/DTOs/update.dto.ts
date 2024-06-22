import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto, CreateCartItemDto, CreateCouponDto, CreateOrderDto } from './create.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
export class UpdateCartItemDto extends PartialType(CreateCartItemDto){}
export class UpdateCartDto extends PartialType(CreateCartDto){}
export class CouponOrder {
    @ApiProperty({example : '50PERCENT', description : 'The code of the coupon'} )
    coupon : String

    @ApiProperty({example : '13', description : 'Id of the order to apply coupon on'})
    orderId : number
}