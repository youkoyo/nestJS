import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

// TodoModule 是一个功能模块，把 todo 相关的控制器和服务收拢到一起。
// 这样项目变大后可以按业务拆分模块，而不是所有内容都堆在 AppModule。
@Module({
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
