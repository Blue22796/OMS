import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the User' })
  name: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the User' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'The password of the User' })
  password: string;

  @ApiProperty({ example: '123 Main St', description: 'The address of the User', required: false })
  address?: string;
}
