import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import type { Todo } from './interfaces/todo.interface';

// Service 负责业务逻辑。
// 控制器拿到请求后，一般不直接处理数据，而是委托给 service。
@Injectable()
export class TodoService {
  // 这里先用内存数组模拟数据源，方便学习 CRUD。
  // 真正项目里通常会换成数据库。
  private readonly todos: Todo[] = [
    {
      id: 1,
      title: 'Learn NestJS basics',
      content: 'Learn about NestJS basics',
      completed: false,
    },
    {
      id: 2,
      title: 'Learn about NestJS decorators',
      content: 'Learn about NestJS decorators',
      completed: false,
    },
    {
      id: 3,
      title: 'Learn about NestJS pipes',
      content: 'Learn about NestJS pipes',
      completed: false,
    },
  ];

  private nextId = this.todos.length + 1;

  // 查询全部 todo。
  findAll(): Todo[] {
    return this.todos;
  }

  // 查询单个 todo；如果不存在就抛 404。
  findOne(id: number): Todo {
    const todo = this.todos.find((item) => item.id === id);

    if (!todo) {
      throw new NotFoundException(`Todo ${id} not found`);
    }

    return todo;
  }

  // 创建 todo。
  // nextId++ 的含义是：先取当前 id，再让计数器加 1。
  create(createTodoDto: CreateTodoDto): Todo {
    const todo: Todo = {
      id: this.nextId++,
      title: this.normalizeTitle(createTodoDto.title),
      content: createTodoDto.content,
      completed: createTodoDto.completed ?? false,
    };

    this.todos.push(todo);

    return todo;
  }

  // 更新 todo。
  // 因为 UpdateTodoDto 的字段都是可选的，所以这里只更新用户真正传入的字段。
  update(id: number, updateTodoDto: UpdateTodoDto): Todo {
    const todo = this.findOne(id);

    if (updateTodoDto.title !== undefined) {
      todo.title = this.normalizeTitle(updateTodoDto.title);
    }

    if (updateTodoDto.completed !== undefined) {
      todo.completed = updateTodoDto.completed;
    }

    if (updateTodoDto.content !== undefined) {
      todo.content = updateTodoDto.content;
    }

    return todo;
  }

  // 删除 todo，成功时返回被删除的对象。
  remove(id: number): Todo {
    const todoIndex = this.todos.findIndex((item) => item.id === id);

    if (todoIndex === -1) {
      throw new NotFoundException(`Todo ${id} not found`);
    }

    const [deletedTodo] = this.todos.splice(todoIndex, 1);

    return deletedTodo;
  }

  // 这里把标题的“去空格 + 判空”封装起来，
  // 这样 create/update 都能复用同一套规则。
  private normalizeTitle(title: string): string {
    const normalizedTitle = title?.trim();

    if (!normalizedTitle) {
      throw new BadRequestException('Todo title is required');
    }

    return normalizedTitle;
  }
}
