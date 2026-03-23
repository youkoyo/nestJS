// 这个 class 主要用于 Swagger 文档展示。
// 之前用 interface 时，TypeScript 编译后类型会消失，Swagger 只能看到 {}。
export class TodoEntity {
  id!: number;

  title!: string;

  content?: string;

  completed!: boolean;
}
