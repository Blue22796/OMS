import {Module} from '@nestjs/common'
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
@Module({
    imports : [PrismaModule, JwtModule.register({secret : 'el_mofta7'})],
    controllers : [AuthController],
    providers : [AuthService, JwtStrategy]
})
export class AuthModule{}