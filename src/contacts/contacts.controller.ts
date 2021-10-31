import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Contacts } from './contact.entity';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  /**
   * Decorated by @Get, this will query our data to return the corresponding Contact Entity.
   * @param id Provided through the path, this is the id (PK) for a given contact.
   * @returns Contact which the id corresponds to
   */
  @Get(':id')
  public getContact(@Param('id') id: string): Promise<Contacts> {
    return this.contactsService.getContact(id);
  }

  /**
   * Decorated by @Post, creates and inserts a new Contact into the database.
   * @param contact Provided by the Body of the request
   * @returns Contact that was just created
   */
  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
    }),
  )
  public createContact(@Body() contact: Contacts): Promise<Contacts> {
    return this.contactsService.createContact(contact);
  }

  /**
   * Decorated by @Delete, deletes the Contact Entity which corresponds to the id passed through the path.
   * @param id Provided through the path, this is the id (PK) for a given contact.
   * @returns void
   */
  @Delete(':id')
  public deleteContact(@Param('id') id: string): Promise<void> {
    return this.contactsService.deleteContact(id);
  }

  /**
   * Decorated by @Put, used to update fields on an already existing contact entity.
   * @param id Provided through the path, this is the id (PK) for a given contact.
   * @param updateParams All or a subset of fields which make up a Contact, the values will replace the already existing values in the database.
   * @returns Contact with updated values
   */
  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  public updateContact(
    @Param('id') id: string,
    @Body() updateParams: Partial<Contacts>,
  ): Promise<Contacts> {
    return this.contactsService.updateContact(id, updateParams);
  }
}
