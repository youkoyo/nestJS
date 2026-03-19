import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import type { Todo } from './interfaces/todo.interface';

@Injectable()
export class TodoService {
  private readonly todos: Todo[] = [
    {
      id: 1,
      title: 'Learn NestJS basics',
      completed: false,
    },
    {
      id: 2,
      title: 'Learn about NestJS decorators',
      completed: false,
    },
    {
      id: 3,
      title: 'Learn about NestJS pipes',
      completed: false,
    },
  ];

  private nextId = this.todos.length + 1;

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((item) => item.id === id);

    if (!todo) {
      throw new NotFoundException(`Todo ${id} not found`);
    }

    return todo;
  }

  create(createTodoDto: CreateTodoDto): Todo {
    const todo: Todo = {
      id: this.nextId++,
      title: this.normalizeTitle(createTodoDto.title),
      completed: createTodoDto.completed ?? false,
    };

    this.todos.push(todo);

    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto): Todo {
    const todo = this.findOne(id);

    if (updateTodoDto.title !== undefined) {
      todo.title = this.normalizeTitle(updateTodoDto.title);
    }

    if (updateTodoDto.completed !== undefined) {
      todo.completed = updateTodoDto.completed;
    }

    return todo;
  }

  remove(id: number): Todo {
    const todoIndex = this.todos.findIndex((item) => item.id === id);

    if (todoIndex === -1) {
      throw new NotFoundException(`Todo ${id} not found`);
    }

    const [deletedTodo] = this.todos.splice(todoIndex, 1);

    return deletedTodo;
  }

  private normalizeTitle(title: string): string {
    const normalizedTitle = title?.trim();

    if (!normalizedTitle) {
      throw new BadRequestException('Todo title is required');
    }

    return normalizedTitle;
  }
}
