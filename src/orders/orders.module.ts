import { Module } from "@nestjs/common";
import { AppController } from "src/app.controller";
import { AppService } from "src/app.service";
import { AuthModule } from "src/auth/auth.module";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
import { UserService } from "src/auth/user.service";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";

@Module({
  imports: [AuthModule],
  controllers: [AppController,CartController,ProductController,OrderController],
  providers: [AppService, CartService, UserService, PrismaService,ProductService, OrderService]
})
export class OrdersModule {}
