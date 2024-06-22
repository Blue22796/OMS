import { Injectable } from "@nestjs/common";
import { Cart, CartItem, Order, Product, User } from "@prisma/client";
import { UserService } from "src/auth/user.service";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCartItemDto } from "./DTOs/create.dto";
import { UpdateCartItemDto } from "./DTOs/update.dto";
import { CreateUserDto } from "src/auth/DTOs/create.dto";

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

    async addItem(item : CreateCartItemDto, email){
        if(!item.productId)
            return "Invalid product id"

        var product = await this.prisma.product.findUnique({
            where : {productId:item.productId}
        })

        if(!product)
            return "Invalid product id"

        var oldItem : CartItem
        console.log(item)
        if(item.cartId)
            oldItem = await this.prisma.cartItem.findFirst({
                where : {
                    cartId : item.cartId, 
                    productId : item.productId
                }
            })

        if(oldItem)
            return this.updateItem(item, email)

        var cart : Cart
        var user : User = await this.userService.findUser({email : email});
        if(item.cartId){
            cart = await this.prisma.cart.findUnique({where : {cartId : item.cartId}})
            console.log(cart)
           if(user.userId != cart.userId)
            return "Unauthorized access to cart."
        }
        if(!cart)
             await this.prisma.cart.create({data : {userId : user.userId}})
            .then(c => cart = c)
            .catch(e => console.log(e))

        item.cartId = cart.cartId
        await this.prisma.cartItem.create({
            data : item
        })
        
        cart.total += product.price*item.quantity
        
        await this.prisma.cart.update({
            where : {cartId : cart.cartId},
            data : {total : cart.total}
        })

        return "Added item successfully"
    }
    async updateItem(item : CreateCartItemDto | UpdateCartItemDto, email){
        
        var oldItem : CartItem = await this.prisma.cartItem.findFirst({
            where : {
                cartId : item.cartId,
                productId : item.productId
            }
        })
        if(!oldItem)
            return "Item doesn't exist"
        
        var cart : Cart = await this.prisma.cart.findUnique(
            {
                where: {cartId : item.cartId}
            }
        )

        var user : User = await this.userService.findUser({email : email});

        if(user.userId != cart.userId)
            return "Unauthorized access to cart."

        var product : Product = await this.prisma.product.findUnique({
            where : {productId : item.productId} 
        })

        await this.prisma.cartItem.update({
            where : {cartItemId : oldItem.cartItemId},
            data : {
                quantity : item.quantity
            }
        })
        
        cart.total -= product.price * oldItem.quantity
        cart.total += product.price * item.quantity

        await this.prisma.cart.update({
            where : {cartId : cart.cartId},
            data : {total : cart.total}
        })

        return "Updated cart successfully"
    }

    async removeItem(itemId, email){
        var oldItem = await this.prisma.cartItem.findUnique({
            where : {cartItemId : itemId}
        })
        if(!oldItem)
            return "Item doesn't exist"
        var item : UpdateCartItemDto = new UpdateCartItemDto()
        console.log(oldItem)
        item.productId = oldItem.productId
        item.cartId = oldItem.cartId
        item.quantity = 0
        console.log(item)
        var res = await this.updateItem(item, email)
        if(res != "Updated cart successfully")
            return "Invalid action"
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