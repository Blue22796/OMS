import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { UserService } from "src/prisma/user.service";
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService{
    constructor(private userService : UserService, private jwtService : JwtService){}
    signup(user : User){
        const cr = this.userService.signup(user);
        console.log(cr)
    }

    
    async signin(user: User){
        user = await this.userService.findUser(user);
        if(!user)
            return "Incorrect credentials"
        console.log(user)
        return this.jwtService.sign({ userId: user.userId, username: user.email })
    }

    selectAll(){
        return this.userService.getAll();
    }
}