# bookApp

Short coding assignment, where we implemented a REST API that calls an external API service to get information about books. Also, we implemented a simple CRUD (Create, Read, Update, Delete) API connecting **mysql** local database.

## Installation

We assume that user has **node.js**, **npm* and **mysql** installed.

First, it is needed to create **mysql** database. There are a lot of different ways to do it such as using **localhost/phpmyadmin**, **DB Sequelize** and different tools. I often do it in terminal:

```bash
mysql -u root -p
```

After entering password: 

```bash
CREATE DATABASE books;
```

Then it is needed to clone the project:

```bash
git clone https://github.com/NerminImamovic/bookApp
```

and we can install packages from **package.json**.


```bash
npm install
```

After that we set configuration in *config/config.json*:

```
{
  "development": {
    "username": "root",
    "password": "password",
    "database": "books",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}
```

On **username**, **password** and **database** we should write our configuration.

Now we can run migrations with the script:


```bash
npm run migrate
```

We can also delete table with running migrate down:

```bash
npm run migrate-down
```


## Usage

After installation and project setup, we can use it.

To use application we should run the script:

```bash
npm run build
```

On the http://127.0.0.1:8080/api-docs/ we have **SWAGGER UI** with all our requests and responses with their content.
