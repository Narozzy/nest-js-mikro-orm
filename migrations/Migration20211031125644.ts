import { Migration } from '@mikro-orm/migrations';

export class Migration20211031125644 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `contacts` (`id` varchar not null, `updated_at` datetime not null, primary key (`id`));');
  }

}
