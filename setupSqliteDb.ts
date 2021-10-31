import connect, { sql } from '@databases/sqlite';

(async () => {
  console.log('Creating database and table');
  const db = connect('contact-book.sqlite3');
  console.log('Database connected');
  await db.query(sql`
    CREATE TABLE IF NOT EXISTS contacts (
      id string PRIMARY KEY,
      updated_at int NOT NULL,
      name string NOT NULL,
      phone_number string NOT NULL UNIQUE,
      email string,
      business string
    );
  `);
  console.log('Table created!');
})();
