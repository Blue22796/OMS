import { Injectable } from "@nestjs/common";
import { Product } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProductService{
    constructor(private prisma : PrismaService){}

    async createProduct(prod : Product){
        await this.prisma.product.create({data:prod})
        return "Created successfully"
    }
}