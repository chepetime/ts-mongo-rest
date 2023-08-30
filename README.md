# Typescript MongoDB REST API

This is a repository for a REST API tutorial using Node, Express, Typescript & MongoDB.

Features:

- Environment, Typescript, Nodemon setup
- MongoDB & Mongoose connect, Database creation
- Controllers creation
- Middlewares creation
- Cookie based authentication
- Postman testing
- Create, Read, Update

## Prerequisites

- Node version 20.x
- pnpm

### Cloning the repository

```shell
git clone https://github.com/chepetime/ts-mongo-rest.git
```

### Install packages

```bash
pnpm i
```

### Setup MongoDB URL

Copy the .env.example file:

```bash
cp .env.example .env
```

Replace variables with your own:

```.env
EXPRESS_COOKIE="" // Auth Cookie Name
MONGODB_URL="" // DB URI
```

### Start the app

```bash
pnpm start
```

## Available commands

Running commands with npm `npm run [command]`

| command    | description                              |
| :--------- | :--------------------------------------- |
| `start`    | Starts a development instance of the app |
| `lint`     | Lint development files                   |
| `lint:fix` | Lint and fix development files           |

## Acknowledgements

- [Antonio Erdeljac](https://github.com/AntonioErdeljac)

---

Made with <3 by [José Lugo](https://joseliugo.dev) at 🇲🇽 Mexico City
