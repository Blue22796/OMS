import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
    @ApiProperty({ example: 1, description: 'The cart ID associated with the Order' })
    cartId: number;
  }

export class CreateCartDto {
  @ApiProperty({ example: 1, description: 'The user ID associated with the Cart' })
  userId: number | undefined
}

export class CreateCartItemDto {
  @ApiProperty({ example: 1, description: 'The cart ID associated with the CartItem' })
  cartId: number;

  @ApiProperty({ example: 1, description: 'The product ID associated with the CartItem' })
  productId: number;

  @ApiProperty({ example: 2, description: 'The quantity of the Product in the CartItem' })
  quantity: number;
}

export class CreateCouponDto {
  @ApiProperty({ example: 'SAVE20', description: 'The code of the Coupon' })
  coupon: string;

  @ApiProperty({ example: 20.0, description: 'The discount percentage or amount of the Coupon' })
  off: number;
}
