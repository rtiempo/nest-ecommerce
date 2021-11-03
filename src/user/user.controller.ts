import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getProducts(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:userId')
  getUserById(
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<User> {
    return this.userService.findOne(userId);
  }

  @Post()
  createProduct(
    @Body() body: CreateUserDto,
    @Body('password') pass: string,
  ): Promise<User> {
    return this.userService.create(body, pass);
  }

  @Patch('/:userId')
  updateUser(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(userId, body);
  }

  @Patch('/:userId/delete')
  deleteUser(
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<User> {
    return this.userService.delete(userId);
  }
}
