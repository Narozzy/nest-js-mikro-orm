import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { IsEmail, IsPhoneNumber, ValidateIf } from 'class-validator';

@Entity({ tableName: 'contacts' })
export class Contacts {
  @Unique()
  @PrimaryKey()
  id: string;

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property()
  name: string;

  @IsPhoneNumber('US')
  @Property()
  @Unique()
  phoneNumber: string;

  @ValidateIf((o) => 'email' in o)
  @IsEmail()
  @Property({ nullable: true })
  email?: string;

  @Property({ nullable: true })
  business?: string;
}
