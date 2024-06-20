import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "@prisma/client";

@Controller('/auth')
export class AuthController{
    constructor(private service : AuthService){}

    @Post('signup')
    signup(@Body() user : User){
        this.service.signup(user);
    }
    @Post('signin')
    signin(@Body() user : User){
        return this.service.signin(user);
    }
    @Get('/users')
    selectAll(){
        return this.service.selectAll();
    }
}