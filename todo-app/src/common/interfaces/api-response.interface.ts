// 统一成功响应的数据结构：
// success 表示请求是否成功；
// statusCode/message 方便前端直接展示；
// data 才是真正的业务数据。
export interface ApiSuccessResponse<T> {
  success: true;
  statusCode: number;
  message: string;
  data: T;
}

// 统一失败响应的数据结构。
export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  path: string;
  timestamp: string;
}
