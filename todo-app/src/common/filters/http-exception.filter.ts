import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import type { ApiErrorResponse } from '../interfaces/api-response.interface';

// ExceptionFilter 用来接住控制器/服务里抛出的异常，
// 再决定最终返回给前端什么样的错误结构。
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    // ArgumentsHost 可以拿到当前请求上下文；
    // 这里我们切到 HTTP 上下文，取出 request/response。
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    // 如果是 Nest 已知的 HttpException，就用它自己的状态码；
    // 否则按 500 处理。
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null;

    // 在这里把所有错误响应统一格式化。
    const errorResponse: ApiErrorResponse = {
      success: false,
      statusCode,
      message: this.getMessage(exceptionResponse),
      path: request.originalUrl || request.url,
      timestamp: new Date().toISOString(),
    };

    response.status(statusCode).json(errorResponse);
  }

  // Nest 的异常 message 可能是字符串，也可能是对象/数组，
  // 这里做一次兼容处理，确保最终总能拿到可读的 message。
  private getMessage(exceptionResponse: string | object | null): string {
    if (typeof exceptionResponse === 'string') {
      return exceptionResponse;
    }

    if (
      exceptionResponse &&
      typeof exceptionResponse === 'object' &&
      'message' in exceptionResponse
    ) {
      const { message } = exceptionResponse;

      if (Array.isArray(message)) {
        return message.join(', ');
      }

      if (typeof message === 'string') {
        return message;
      }
    }

    return 'Internal server error';
  }
}
