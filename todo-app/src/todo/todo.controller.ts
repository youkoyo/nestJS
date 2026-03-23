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
import { buildApiResponse } from '../common/utils/api-response.util';
import { CreateTodoDto } from './dto/create-todo.dto';
import {
  TodoListResponseDto,
  TodoResponseDto,
} from './dto/todo-response.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

// Controller 负责接收 HTTP 请求、提取参数、调用 service，再把结果返回给前端。
// 它尽量只做“路由和参数处理”，业务逻辑放到 service 中。
@UseFilters(new HttpExceptionFilter())
@Controller('todo')
export class TodoController {
  // Nest 会通过依赖注入把 TodoService 实例传进来。
  constructor(private readonly todoService: TodoService) {}

  // GET /todo
  @Get()
  findAll(): TodoListResponseDto {
    return buildApiResponse(
      HttpStatus.OK,
      'Todos retrieved successfully',
      this.todoService.findAll(),
    );
  }

  // ParseIntPipe 的作用是把路径参数 id 从字符串转成数字；
  // 如果转换失败，会直接抛 400 错误。
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): TodoResponseDto {
    return buildApiResponse(
      HttpStatus.OK,
      'Todo retrieved successfully',
      this.todoService.findOne(id),
    );
  }

  // @Body() 会把请求体映射到 CreateTodoDto。
  // 因为已经开启了 ValidationPipe，所以这里会自动触发 DTO 校验。
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createTodoDto: CreateTodoDto,
  ): TodoResponseDto {
    return buildApiResponse(
      HttpStatus.CREATED,
      'Todo created successfully',
      this.todoService.create(createTodoDto),
    );
  }

  // PATCH 常用于部分更新，所以这里接收的是 UpdateTodoDto。
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ): TodoResponseDto {
    return buildApiResponse(
      HttpStatus.OK,
      'Todo updated successfully',
      this.todoService.update(id, updateTodoDto),
    );
  }

  // @HttpCode 只控制“成功时”的状态码；
  // 如果 service 里抛异常，最终状态码会由异常类型决定。
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(
    @Param('id', ParseIntPipe) id: number,
  ): TodoResponseDto {
    return buildApiResponse(
      HttpStatus.OK,
      'Todo deleted successfully',
      this.todoService.remove(id),
    );
  }
}
