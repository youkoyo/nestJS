import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Todo)
    private readonly todoRepository: EntityRepository<Todo>,
  ) {}
  create(createTodoDto: CreateTodoDto) {
    return 'This action adds a new todo' + createTodoDto.title;
  }

  findAll() {
    return `This action returns all todos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo` + updateTodoDto.title;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
