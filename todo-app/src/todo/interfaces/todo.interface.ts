// interface 用来描述 Todo 在代码里的数据结构。
// 它只参与 TypeScript 的类型检查，编译成 JS 后不会保留下来。
export interface Todo {
  id: number;
  title: string;
  content?: string;
  completed: boolean;
}
