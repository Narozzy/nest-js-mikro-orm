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

  public async getContact(id: string): Promise<Contacts> {
    const queriedContact = await this.contactsRepo.findOne({ id: id });
    if (!queriedContact) {
      throw new NotFoundException(`Unable to find contact with id: ${id}`);
    }
    return queriedContact;
  }

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

  public async deleteContact(id: string): Promise<void> {
    await this.contactsRepo.nativeDelete({ id: id });
  }

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
