# Fast Deploy - Backend NestJs

## Descrição
Backend criado em base do Node utilizando o Framework NestJs, para conexão com o banco de dados escolhi o prisma. Banco de Dados em SQLite. Upload de arquivos com nestjs-form-data, Validador de DTO nas rotas com class-validator, token jwt e refresh token. Listagem de dados com paginação, ordenação e filtros.

## Possibilidades para incluir no futuro da Aplicação (Sem Regra de Negócio)
* Multi Linguagem
* Testes Unitários

## Observações
Dentre as várias Libs utilizadas nesse frontend, abaixo as que merecem atenção:
`class-validator`: Faz a validação dos dados entrando na rota da aplicação através dos Dtos;
`nestjs-form-data`: Faz a validação dos uploads;
`prisma`: Para gerenciar as requisições feitas para o banco de dados;
`@nestjs/serve-static`: Fornecer os arquivos estáticos dos uploads;

## Instalação e execução do código
Depois de clonado o projeto, execute a instalação dos pacotes com o comando:
`npm i`;
Depois de tudo instalado, execute a aplicação com o comando:
`npm start`;
Certifique-se do frontend/postman da aplicação estar sendo executado, divirta-se!


## Usefull Commands

```js
// Open Prisma Studio
npx prisma studio

// Prisma Migrate
npx prisma migrate dev

// Nestjs Generate Resource (Controller/Service/Module)
nest g resource modules/auth
```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
