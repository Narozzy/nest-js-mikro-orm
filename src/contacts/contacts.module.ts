import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Contacts } from './contact.entity';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';

@Module({
  imports: [MikroOrmModule.forFeature([Contacts])],
  providers: [ContactsService],
  controllers: [ContactsController],
})
export class ContactModule {}
