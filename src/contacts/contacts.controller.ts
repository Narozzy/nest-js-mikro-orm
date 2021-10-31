import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Contacts, ContactType } from './contact.entity';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get(':id')
  public getContact(@Param('id') id: string): Promise<Contacts> {
    return this.contactsService.getContact(id);
  }

  @Post()
  public createContact(@Body() contact: ContactType): Promise<Contacts> {
    return this.contactsService.createContact(contact);
  }

  @Delete(':id')
  public deleteContact(@Param('id') id: string): Promise<void> {
    return this.contactsService.deleteContact(id);
  }

  @Put(':id')
  public updateContact(
    @Param('id') id: string,
    @Body() updateParams: Partial<ContactType>,
  ): Promise<Contacts> {
    return this.contactsService.updateContact(id, updateParams);
  }
}
