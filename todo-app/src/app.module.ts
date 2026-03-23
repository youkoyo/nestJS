import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { UsersModule } from './users/users.module';

// AppModule 是根模块，Nest 会从这里开始组装整个应用。
// imports 放功能模块，controllers 放当前模块自己的控制器，providers 放可注入的服务。
@Module({
  imports: [TodoModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
