import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 在 swc + Swagger plugin 模式下，Nest CLI 会生成 src/metadata.ts。
  // 这里把它加载进 Swagger，这样就不需要在代码里手写大量 Swagger 装饰器。
  try {
    await SwaggerModule.loadPluginMetadata(async () => {
      const metadataModule = require('./metadata');

      return typeof metadataModule.default === 'function'
        ? metadataModule.default()
        : metadataModule;
    });
  } catch {
    // watch 模式首次启动时，metadata 可能还没生成；
    // 等 typeCheck 进程生成 metadata 后，应用会自动再次编译并重启。
  }

  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('Todo API description')
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'Local server')
    .addTag('todos')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory(), {
    jsonDocumentUrl: 'swagger/json',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
