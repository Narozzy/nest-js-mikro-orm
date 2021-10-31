import { wrap } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/knex';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Contacts } from 'src/contacts/contact.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contacts)
    private readonly contactsRepo: EntityRepository<Contacts>,
  ) {}

  /**
   * Called by the @Get endpoint in contacts.controller.ts, retrieves a Contact.
   * @param id The id corresponding to a Contact Entity.
   * @returns Contact which corresponds to the id passed in.
   */
  public async getContact(id: string): Promise<Contacts> {
    const queriedContact = await this.contactsRepo.findOne({ id: id });
    if (!queriedContact) {
      throw new NotFoundException(`Unable to find contact with id: ${id}`);
    }
    return queriedContact;
  }

  /**
   * Called by the @Post endpoint in contacts.controller.ts, creates and inserts a new Contact.
   * @param contact an object which will be used to create a new Contact Entity
   * @returns Contact that was created
   */
  public async createContact({
    name,
    phoneNumber,
    email,
    business,
  }: Contacts): Promise<Contacts> {
    const contact = this.contactsRepo.create({
      id: uuidv4(),
      name,
      phoneNumber,
      email,
      business,
    });
    await this.contactsRepo.persistAndFlush(contact);
    return contact;
  }

  /**
   * Called by the @Delete endpoint in contacts.controller.ts, deletes an existing Contact from the database.
   * @param id The id corresponding to a Contact Entity
   */
  public async deleteContact(id: string): Promise<void> {
    await this.contactsRepo.nativeDelete({ id: id });
  }

  /**
   *
   * @param id The id corresponding to a Contact Entity
   * @param contactUpdateParams A subset or all keys with new values that will be used to update the entry in the database
   * @returns Contact with newly updated values.
   */
  public async updateContact(
    id: string,
    contactUpdateParams: Partial<Contacts>,
  ): Promise<Contacts> {
    const contactToUpdate = await this.contactsRepo.findOne({ id: id });
    if (!contactToUpdate) {
      throw new NotFoundException(`Unable to find contact with id: ${id}`);
    }
    const updatedContact = wrap(contactToUpdate).assign(contactUpdateParams);
    this.contactsRepo.flush();
    return updatedContact;
  }
}
