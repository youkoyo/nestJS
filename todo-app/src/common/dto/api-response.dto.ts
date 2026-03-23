// 这两个 class 主要给 Swagger 文档使用。
// 和 interface 不同，class 在运行时依然存在，Swagger 才能读取到字段信息。
export class ApiSuccessResponseDto {
  success!: boolean;

  statusCode!: number;

  message!: string;
}

export class ApiErrorResponseDto {
  success!: boolean;

  statusCode!: number;

  message!: string;

  path!: string;

  timestamp!: string;
}
