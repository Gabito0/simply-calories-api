import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateCatDto } from './crearte-cat.dto';
import { agent } from 'supertest';

@Controller('cats')
export class CatsController {
  @Post()
  async create(@Body() CreateCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get('abcd/*')
  findAll2() {
    return 'This route uses a wildcard';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
  }
  @Get()
  async findAll3(@Query('age') age: number, @Query('breed') breed: string) {
    return `This action returns all cats filtered by age: ${age} and breed: ${breed}`;
  }
}
