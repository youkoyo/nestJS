import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/legacy';

@Entity()
export class Todo {
  @PrimaryKey({ type: 'integer', autoincrement: true })
  id: number;

  @Property()
  title: string;

  @Property()
  content: string;

  @Property({ default: false })
  isCompleted: boolean;
}
