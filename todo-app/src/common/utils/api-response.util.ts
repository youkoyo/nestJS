import type { ApiSuccessResponse } from '../interfaces/api-response.interface';

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
