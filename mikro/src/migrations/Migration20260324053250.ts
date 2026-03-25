import { Migration } from '@mikro-orm/migrations';

export class Migration20260324053250 extends Migration {
  override up(): void | Promise<void> {
    this.addSql(
      `create table "todo" ("id" serial primary key, "title" varchar(255) not null, "content" varchar(255) not null, "is_completed" boolean not null default false);`,
    );
  }

  override down(): void | Promise<void> {
    this.addSql(`drop table if exists "todo" cascade;`);
  }
}
