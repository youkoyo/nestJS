import type { ApiSuccessResponse } from '../interfaces/api-response.interface';

// 这个工具函数的作用是：把成功响应统一包成同一种格式，
// 避免每个控制器方法里都手写同样的 success/statusCode/message/data。
export function buildApiResponse<T>(
  statusCode: number,
  message: string,
  data: T,
): ApiSuccessResponse<T> {
  return {
    success: true,
    statusCode,
    message,
    data,
  };
}
