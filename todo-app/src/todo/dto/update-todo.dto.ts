import { PartialType } from '@nestjs/swagger';
import { CreateTodoDto } from './create-todo.dto';

// PartialType(CreateTodoDto) 会基于 CreateTodoDto 生成一个“所有字段都变成可选”的 DTO。
// 这很适合 update 场景，因为更新时通常只改部分字段。
export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
