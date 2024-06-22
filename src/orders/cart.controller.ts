import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CartItem, Prisma, User } from "@prisma/client";
import { CartService } from "./cart.service";
import { CreateCartItemDto } from "./DTOs/create.dto";
import { UpdateCartDto, UpdateCartItemDto } from "./DTOs/update.dto";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger";
import { UpdateUserDto } from "src/auth/DTOs/update.dto";

@ApiTags('cart')
@Controller("api/cart")
export class CartController {
    constructor(private service: CartService) {}

    @Post('add')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Add item to cart' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Item added successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async addItem(@Req() req, @Body() item: CreateCartItemDto) {
        return await this.service.addItem(item, req.user.username);
    }

    @Get('view/:id')
    @ApiOperation({ summary: 'View user carts' })
    @ApiParam({ name: 'id', type: Number, description: 'The ID of the user' })
    @ApiResponse({ status: 200, description: 'User carts retrieved successfully' })
    async viewCarts(@Param('id') userId) {
        userId = parseInt(userId)
        if (!userId) userId = -1;
        return await this.service.findCarts(userId);
    }

    @Put('update')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Update cart item' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Cart item updated successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async updateCart(@Req() req, @Body() item: UpdateCartItemDto) {
        console.log(req.user.username)
        return await this.service.updateItem(item, req.user.username);
    }

    @Delete('remove/:id')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Remove item from cart' })
    @ApiParam({ name: 'id', type: Number, description: 'The ID of the cart item to remove' })
    @ApiResponse({ status: 200, description: 'Cart item removed successfully' })
    @ApiResponse({ status: 400, description: 'Bad parameters' })
    async removeItem(@Req() req, @Param('id') itemId) {
        itemId = parseInt(itemId)
        if (!itemId) return "Bad parameters."
        console.log(req.user)
        return await this.service.removeItem(itemId, req.user.username);
    }
}
