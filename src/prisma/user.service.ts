import { Injectable } from "@nestjs/common";
import { PrismaClient, User } from "@prisma/client";
import { PrismaService } from "./prisma.service";

@Injectable({})
export class UserService{
    constructor(private prisma : PrismaService){}
    async signup(user : User){
        this.prisma.user.create({data : user}).catch(e=>console.log(e))
    }

    async findUser(creds : User){
        const user : User = await this.prisma.user.findUnique({where : {
            email : creds.email,
            password : creds.password
        }
    })
    return user
    }

    async getAll(){
        console.log('idk')
        return await this.prisma.user.findMany();
    }

}