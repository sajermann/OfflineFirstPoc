import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';

import { AuthGuard } from 'src/shared/guard/auth.guard';
import { Roles } from 'src/shared/decorator/roles.decorator';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Roles(['admin'])
  @Post()
  async create(@Body() data: CreateUserDto) {
    // return this.userService.create(data);
    return 'test';
  }

  // @UseGuards(AuthGuard)
  // @Roles(['admin'])
  // @Get()
  // async read(@Query() data: GetUserFilter) {
  //   return this.userService.get(data);
  // }

  // @UseGuards(AuthGuard)
  // @Roles(['admin'])
  // @Put()
  // async update(@Body() data: UpdateUserDto) {
  //   return this.userService.update(data);
  // }

  // @UseGuards(AuthGuard)
  // @Roles(['admin'])
  // @Delete('/:userId')
  // @HttpCode(204)
  // async delete(@Param('userId', new ParseUUIDPipe()) userId) {
  //   this.userService.delete(userId);
  // }
}
