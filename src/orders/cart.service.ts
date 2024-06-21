import { Injectable } from "@nestjs/common";
import { Cart, CartItem, Order, Product, User } from "@prisma/client";
import { UserService } from "src/auth/user.service";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CartService{
    constructor(private prisma : PrismaService, private userService : UserService){}

    async findCart(id){
        return await this.prisma.cart.findUnique({where : {
            cartId : id
        }})
    }

    async findCarts(userId){
        if(userId!=-1)
            return await this.prisma.cart.findMany({
        where : {
            userId : userId
        }
        })
        return await this.prisma.cart.findMany()
    }

    async addItem(item : CartItem, email){
        var cart : Cart
        var product : Product = await this.prisma.product.findUnique({
            where : {productId:item.productId}
        })

        if(!product)
            return "Product doesn't exist"

        if(item.cartId)
            cart = await this.prisma.cart.findUnique({where : {cartId : item.cartId}})

        var user : User = await this.userService.findUser({email : email});

        if(!cart){
            await this.prisma.cart.create({data : {userId : user.userId}})
            .then(c => cart = c)
            .catch(e => console.log(e))
        }
        
        item.cartId = cart.cartId

        if(user.userId != cart.userId)
            return "Unauthorized access to cart."

        var oldItem : CartItem = await this.prisma.cartItem.findFirst({
            where : {
                cartId : cart.cartId,
                productId : item.productId
            }
        })

        if(!oldItem){
            oldItem = await this.prisma.cartItem.create({data : item})
            cart.total+= product.price*item.quantity
        }

        else{
                await this.prisma.cartItem.update({
                where : {cartItemId : oldItem.cartItemId},
                data : {
                    quantity : item.quantity
                }
            })
        }

        cart.total -= product.price*oldItem.quantity
        cart.total += product.price * item.quantity

        await this.prisma.cart.update({
            where : {cartId : cart.cartId},
            data : {total : cart.total}
        })

        return "Added item successfully"
    }

    async removeItem(itemId){
        await this.prisma.cartItem.delete({where : {cartItemId : itemId}})
        return "Removed item successfully"
    }

    async checkCart(cartId){
        var items = await this.prisma.cartItem.findMany({
            where : {cartId : cartId},
            include : {
                product : true
            }
        })
        items.forEach(
            (item, idx) => {
                if(item.product.stock < item.quantity)
                    return false
                else item.product.stock -= item.quantity
            })
        await items.forEach(
            (item, idx) => {
                console.log(item.product.stock)
                this.prisma.product.update({
                    where : {productId : item.productId},
                    data : {stock : item.product.stock}
                }).catch(e=>console.log(e))
            }
        )
        return true
    }
}