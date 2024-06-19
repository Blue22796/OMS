import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { UserService } from "src/prisma/user.service";

@Injectable({})
export class AuthService{
    constructor(private userService : UserService){}
    signup(user : User){
        const cr = this.userService.signup(user);
        console.log(cr)
    }
    selectAll(){
        return this.userService.getAll();
    }
}