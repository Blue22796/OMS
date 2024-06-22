import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { UserService } from "src/auth/user.service";
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from "./DTOs/create.dto";
import { UpdateUserDto } from "./DTOs/update.dto";

@Injectable({})
export class AuthService{
    constructor(private userService : UserService, private jwtService : JwtService){}
    async signup(user : CreateUserDto){
        return await this.userService.signup(user);
    }

    
    async signin(user: UpdateUserDto){
        var signedAs: User = await this.userService.findUser(user);
        if(!signedAs)
            return "Incorrect credentials"
        return this.jwtService.sign({ userId: signedAs.userId, username: signedAs.email })
    }

    selectAll(){
        return this.userService.getAll();
    }
}