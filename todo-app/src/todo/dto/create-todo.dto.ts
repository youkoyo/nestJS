import { IsBoolean, IsOptional, IsString } from 'class-validator';

// DTO(Data Transfer Object) 用来描述“客户端发请求时，允许传什么数据”。
// 它和 interface 的区别是：class 在运行时依然存在，所以可以配合装饰器做校验。
export class CreateTodoDto {
  // title 是必填字符串；如果传了数字、数组等类型，会被 ValidationPipe 拦下。
  @IsString()
  title!: string;

  // IsOptional 表示这个字段可以不传；
  // 如果传了，就继续用 IsString 校验它必须是字符串。
  @IsOptional()
  @IsString()
  content?: string;

  // completed 也是可选字段；如果传了，必须是 boolean。
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
