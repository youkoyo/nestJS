import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import type { ApiSuccessResponse } from '../common/interfaces/api-response.interface';
import { buildApiResponse } from '../common/utils/api-response.util';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import type { Todo } from './interfaces/todo.interface';
import { TodoService } from './todo.service';

@UseFilters(new HttpExceptionFilter())
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(): ApiSuccessResponse<Todo[]> {
    return buildApiResponse(
      HttpStatus.OK,
      'Todos retrieved successfully',
      this.todoService.findAll(),
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): ApiSuccessResponse<Todo> {
    return buildApiResponse(
      HttpStatus.OK,
      'Todo retrieved successfully',
      this.todoService.findOne(id),
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createTodoDto: CreateTodoDto,
  ): ApiSuccessResponse<Todo> {
    return buildApiResponse(
      HttpStatus.CREATED,
      'Todo created successfully',
      this.todoService.create(createTodoDto),
    );
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ): ApiSuccessResponse<Todo> {
    return buildApiResponse(
      HttpStatus.OK,
      'Todo updated successfully',
      this.todoService.update(id, updateTodoDto),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(
    @Param('id', ParseIntPipe) id: number,
  ): ApiSuccessResponse<Todo> {
    return buildApiResponse(
      HttpStatus.OK,
      'Todo deleted successfully',
      this.todoService.remove(id),
    );
  }
}
