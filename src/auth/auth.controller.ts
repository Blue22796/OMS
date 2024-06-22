import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from './DTOs/create.dto';
import { UpdateCartDto } from 'src/orders/DTOs/update.dto';
import { UpdateUserDto } from './DTOs/update.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Create a new user account' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User account created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid user data' })
  async signup(@Body() user: CreateUserDto) {
    return await this.authService.signup(user);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Authenticate and sign in a user' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'JWT token' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async signin(@Body() user: UpdateUserDto) {
    return await this.authService.signin(user);
  }

  @Get('users')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users retrieved successfully' })
  async selectAll() {
    return await this.authService.selectAll();
  }
}
