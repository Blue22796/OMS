import { Body, Controller, Post } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "@prisma/client";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Products')
@Controller('api/prod')
export class ProductController{
    constructor(private service : ProductService){}
    
    @Post('create')
    async create(@Body() prod : Product){
        return await this.service.createProduct(prod);
    }
}