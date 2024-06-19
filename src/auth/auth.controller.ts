import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('/auth')
export class AuthController{
    constructor(private service : AuthService){}
    @Post('signup')
    signup(@Body() user : any){
        this.service.signup(user);
    }
    @Get('/users')
    selectAll(){
        return this.service.selectAll();
    }
}