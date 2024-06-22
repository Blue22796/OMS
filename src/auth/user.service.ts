import { Injectable } from "@nestjs/common";
import { Cart, PrismaClient, User } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./DTOs/create.dto";

@Injectable({})
export class UserService{
    constructor(private prisma : PrismaService){}
    async signup(user : CreateUserDto){
        var created = true
        await this.prisma.user.create({data : user})
        .catch(e=>{console.log(e); created = false})
        if(!created)
            return "Account already exists, try signing in instead."
        return "Account created successfully"
    }
    async findUser(creds){
        return await this.prisma.user.findUnique({where : creds})
    }
    async findUserById(id){
        return await this.prisma.user.findUnique(id)
    }

    async getAll(){
        console.log('idk')
        return await this.prisma.user.findMany();
    }

}