import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';

export type ContactType = {
  id: string;
  updatedAt: Date;
  name: string;
  phoneNumber: string;
  email: string;
  business: string;
};

@Entity({ tableName: 'contacts' })
export class Contacts {
  @Unique()
  @PrimaryKey()
  id: string;

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property()
  name: string;

  @Property()
  @Unique()
  phoneNumber: string;

  @Property({ nullable: true })
  email?: string;

  @Property({ nullable: true })
  business?: string;
}
