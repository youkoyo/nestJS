import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const seededTodos = [
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

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/todo (GET)', () => {
    return request(app.getHttpServer())
      .get('/todo')
      .expect(200)
      .expect({
        success: true,
        statusCode: 200,
        message: 'Todos retrieved successfully',
        data: seededTodos,
      });
  });

  it('/todo (POST, PATCH, DELETE)', async () => {
    const server = app.getHttpServer();

    await request(server)
      .post('/todo')
      .send({ title: 'Ship todo API' })
      .expect(201)
      .expect({
        success: true,
        statusCode: 201,
        message: 'Todo created successfully',
        data: {
          id: 4,
          title: 'Ship todo API',
          completed: false,
        },
      });

    await request(server)
      .patch('/todo/4')
      .send({ completed: true })
      .expect(200)
      .expect({
        success: true,
        statusCode: 200,
        message: 'Todo updated successfully',
        data: {
          id: 4,
          title: 'Ship todo API',
          completed: true,
        },
      });

    await request(server)
      .delete('/todo/4')
      .expect(200)
      .expect({
        success: true,
        statusCode: 200,
        message: 'Todo deleted successfully',
        data: {
          id: 4,
          title: 'Ship todo API',
          completed: true,
        },
      });

    await request(server)
      .get('/todo/4')
      .expect(404)
      .expect((response) => {
        expect(response.body).toMatchObject({
          success: false,
          statusCode: 404,
          message: 'Todo 4 not found',
          path: '/todo/4',
        });
        expect(typeof response.body.timestamp).toBe('string');
      });
  });

  it('/todo/:id (GET, invalid id)', () => {
    return request(app.getHttpServer())
      .get('/todo/abc')
      .expect(400)
      .expect((response) => {
        expect(response.body).toMatchObject({
          success: false,
          statusCode: 400,
          message: 'Validation failed (numeric string is expected)',
          path: '/todo/abc',
        });
        expect(typeof response.body.timestamp).toBe('string');
      });
  });
});
