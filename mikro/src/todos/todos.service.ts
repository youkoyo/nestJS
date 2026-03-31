import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: EntityRepository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const todo = this.todoRepository.create(createTodoDto);
    await this.todoRepository.getEntityManager().persist(todo).flush();
    return todo;
  }

  async findAll() {
    return await this.todoRepository.findAll();
  }

  async findOne(id: number) {
    const todo = await this.todoRepository.findOne(id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.findOne(id);
    this.todoRepository.getEntityManager().assign(todo, updateTodoDto);
    await this.todoRepository.getEntityManager().flush();
    return todo;
  }

  async remove(id: number) {
    const todo = await this.findOne(id);
    await this.todoRepository.getEntityManager().remove(todo).flush();
    return todo;
  }
}
