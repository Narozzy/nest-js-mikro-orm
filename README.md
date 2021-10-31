## Description

Simple CRUD Assignment

Tech Demonstrated: [Nest](https://github.com/nestjs/nest) framework utilizing [MikroOrm](https://mikro-orm.io/).

---

## Installation

```bash
$ npm install
```

---

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

---

## Schema

The database used is Sqlite, the database has a table: `contacts` which has the following values:

| Column Name           | Type   |
| --------------------- | ------ |
| id (PK)               | string |
| updated_at            | int    |
| name                  | string |
| phone_number (UNIQUE) | string |
| email                 | string |
| business              | string |

I have added an additional command to the `start` package.json script which should automatically create the database/table for you then will proceed to bootstrap the NestJS application.

If you are using VS Code to run this repository, I recommend the [SQLite extension](https://marketplace.visualstudio.com/items?itemName=alexcvzz.vscode-sqlite) as you can simply click on the query button (should display a play button next to the table name) to see the values that are in the table after each endpoint is hit.

---

## How to run locally

1.  Ensure you have [SQLite](https://www.sqlite.org/download.html) installed, use whatever means of adding SQLite to the path.

2.  Run `npm install`

3.  Run `npm run start`, this should automatically create the database and table in the file: **contact-book.sqlite3**

4.  Utilizing an API platform ([Postman](https://www.postman.com/), [Thunder Client if using VS Code](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client), etc.) or cURL, create the following requests for each endpoint:

    4a. POST request to `localhost:3000/contacts`. Within the body, specify at least "name" and "phoneNumber", additionally you can specify an "email" and a "business", all of which are string values as indicated in the _Schema_ section.

        - Take note of the ID passed back, as you will need that for the other requests. This will be referenced below by {CONTACT_ID}

    4b. GET request to `localhost:3000/contacts/{CONTACT_ID}`. After sending, this will retrieve the newly created contact entity from the database.

    4c. PUT request to `localhost:3000/contacts/{CONTACT_ID}`. Within the body, you can pass in any key listed above in _Schema_ with a new value you wish to update. If you didn't specify an email or business, go ahead and do that!

    4d. DELETE request to `localhost:3000/contacts/{CONTACT_ID}`. This will find and delete the contact entity from the database.
