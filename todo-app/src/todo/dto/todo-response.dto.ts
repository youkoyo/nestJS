import { ApiSuccessResponseDto } from '../../common/dto/api-response.dto';
import { TodoEntity } from '../entities/todo.entity';

// 由于 Swagger 不能直接推断泛型 ApiSuccessResponse<T> 里的 T，
// 所以这里定义具体的响应 DTO，让 Swagger 知道 data 的真实结构。
export class TodoResponseDto extends ApiSuccessResponseDto {
  data!: TodoEntity;
}

export class TodoListResponseDto extends ApiSuccessResponseDto {
  data!: TodoEntity[];
}
