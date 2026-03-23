import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

describe('TodoController', () => {
  let controller: TodoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();

    controller = module.get<TodoController>(TodoController);
  });

  it('should return the seeded todo list', () => {
    expect(controller.findAll()).toEqual({
      success: true,
      statusCode: 200,
      message: 'Todos retrieved successfully',
      data: [
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
      ],
    });
  });

  it('should create a todo with a generated id', () => {
    expect(controller.create({ title: '  Write tests  ' })).toEqual({
      success: true,
      statusCode: 201,
      message: 'Todo created successfully',
      data: {
        id: 4,
        title: 'Write tests',
        completed: false,
      },
    });
  });

  it('should update an existing todo', () => {
    expect(controller.update(2, { completed: true })).toEqual({
      success: true,
      statusCode: 200,
      message: 'Todo updated successfully',
      data: {
        id: 2,
        title: 'Learn about NestJS decorators',
        content: 'Learn about NestJS decorators',
        completed: true,
      },
    });
  });

  it('should remove an existing todo', () => {
    expect(controller.remove(2)).toEqual({
      success: true,
      statusCode: 200,
      message: 'Todo deleted successfully',
      data: {
        id: 2,
        title: 'Learn about NestJS decorators',
        content: 'Learn about NestJS decorators',
        completed: false,
      },
    });
    expect(() => controller.findOne(2)).toThrow(NotFoundException);
  });

  it('should reject empty todo titles', () => {
    expect(() => controller.create({ title: '   ' })).toThrow(
      BadRequestException,
    );
  });
});
