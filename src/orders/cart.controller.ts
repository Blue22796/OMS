import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CartItem, Prisma, User } from "@prisma/client";
import { CartService } from "./cart.service";

@Controller("api/cart")
export class CartController{
    constructor(private service : CartService){}
    @Post('add')
    @UseGuards(AuthGuard('jwt'))
    async addItem(@Req() req, @Body() item : CartItem){
        return await this.service.addItem(item, req.user.username)
    }

    @Get('view/:id')
    async viewCarts(@Param('id') userId){
        userId = parseInt(userId)
        if(!userId)
            userId = -1
        return await this.service.findCarts(userId)
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('update')
    async updateCart(@Req() req){
        return await this.service.addItem(req.itemId, req.user)
    }

    @Delete('remove/:id')
    async removeItem(@Param('id') itemId){
        itemId = parseInt(itemId)
        if(!itemId)
            return "Bad parameters."
        return await this.service.removeItem(itemId)
    }

}