# About

This is the main API for the `@lumina` apps. It also issues manages, makes requests to, and receives updates from the render engine `apps/render`.

The Production API Lives at: https://wbzx416xkc.execute-api.us-east-1.amazonaws.com/production/

The Dev API Lives at: https://itzhm3j5jc.execute-api.us-east-1.amazonaws.com/dev/

_Note_: Prisma, and right now, especially Nexus docs, are really in flux. Rely more on the patterns we are using before we make a push to upgrade to newest versions of prisma and nexus in a serverless environment.

This application stack sits with [Prisma2](https://github.com/prisma/prisma2) to connect schema to the database, [prisma-nexus](https://github.com/prisma-labs/nexus-prisma) to allow [nexus](https://github.com/prisma-labs/nexus) to construct the graphQL query and mutation schema based on nexus defined types, and [graphQL Yoga](https://github.com/prisma-labs/graphql-yoga) to run the graphQL Server.

In production this app is run as a lambda function on the [Serverless](https://serverless.com/) framework. Local development mocks this environment, to minimize platform specific errors.

[Development Workflow](#Development-Workflow) and [Scaffolding](#Scaffolding) are detailed below, as well as useful information about each technology for our app.

# Quick Start

```
# fork this repo
# use .env template to set up local development environment
# add postgreS endpoint to DB_ENDPOINT.  Consumed by, ./prisma/schema.prisma
# can be remote PGS or local server

# runs lambda's offline so graphql can be explored locally
# visit http://127.0.0.1:4000/ to test queries
yarn dev
# actual graphQL endpoint for client is POST http://127.0.0.1:4000/

# interactive debugging
yarn dev:debug

# deploy to dev api serverless environment
yarn deploy:dev
```

# Environments and Deployment

## Deployment

### Production

```
# finish sick feature
# save any changes to schema
# commit everything to feature branch
# submit PR
# PR approved and merged to master
# after PR has been merged
git checkout master
git pull
# ensure ./prisma/.env is pointed at production DB
# generate prisma client from prisma schema and nexus typings
yarn generate
yarn deploy
# follow steps above from appropriate branch
# for dev
# yarn deploy:dev
```

To ensure that the correct settings are in the .env file:
e.g `.env` should be loaded with variables from `.env.staging` if deploying to staging, and `.env.production` if deploying to master.

## Set Up a Postgres Server for Dev

### Locally

***TODO***

### On AWS RDS

1. Create new instance in RDS
1. Create a security group to open all incoming ports from your current IP Address
1. Create `DB_ENDPOINT` in the `.env` file of the newly created database host with the proper db name e.g `/production` for `master`, `/staging` for `staging`, `/dev` for dev.
1. Run `yarn prisma migrate up --experimental` to apply current version of the schema
1. Don't do this for Production: Run `yarn prisma seed` to seed database with data
1. Remove security group from instance

### Migrating the Database

SEE NEW PRISMA Migrate Commands

Do migrations 1 at a time!

1. Migrate the Data with a Type Script
1. IMPORTANT: COPY THE `schema.prisma` file to the migrations folder so that there is a snap shot of schema at the time the migration script should be run 
1. Create Database Migration
1. Place migration script in migration folder with `BEFORE` or `AFTER` label for if script should be run before or after the migration

# Development Workflow

## Development Commands

- **`yarn dev`** This is the main development command and uses serverless offline to run a graphQl server at `http://127.0.0.1:4000/`. `POST` requests sent here will be run through the `graphqlHandler` defined in `./src/server.ts`. `GET` requests sent here (e.g. visiting this url in your browser) will hit the `playgroundHandler` defined in `./src/server.ts`. The playground is useful for understanding the graphQL schema, and how the front end can consume the API.
- **`yarn dev:debug`** Is the same as `yarn dev` except you can use the `debugger` statement to interactively debug resolvers and middleware. Open up the developer tools in chrome and the node inspector should be available.

# Scaffolding

- The Prisma database schema lives in `./prisma/schema.prisma`.
- Nexus uses all the types defined in to generate GraphQL queries/mutations/objects `./src/types`
- Nexus generates types in `./packages/types` which can be consumed by other applications
- (depricated) Middlewares defined in `./src/middleware` are applied by `./src/server.ts` IN THE SPECIFIED ORDER. For instance, in `./src/middelware/index.ts`: `topLevelMiddleware`, `resolverSpecificMiddleware`, `permissionsMiddleware`, are applied in the order that they are invoked.

# Authorization
If not listed below, all queries are protected by `isLuminaAdmin` with their prisma generated methods.

`Customer`, `Order`, `Request`, `User`, and `Videos` work slightly differently.

Using `Foo` as an example:

All tenant protected queries and mutations are aliases of prisma generated `t.crud.doSomething()` for example, queries `t.crud.foo()` and `t.crud.foos()` and mutations `t.updateOneFoo` etc.

- `getOneCustomerFoo` is limited to `isCustomerUser` and is protected by returning the resource, and then testing to make sure that the return resource's `customerTenant` is in `user.tenants`.
- `getCustomerFoos` is limited to `isCustomerUser` protected by extending the `where` clause with `where: {customerTenant: {in: [...userTenants]}} ...otherWhereArgs` - this limits DOS style large scale queries, and is more efficient (and maintainable) than sifting through returned data
- `createOneFoo` is limited to `isCustomerAdmin` and is protected by making sure that `{data: {customer: {connect:{tenant}}}}` is in `user.tenants` before firing mutation
- `updateOneCustomerFoo` is limited to `isCustomerAdmin` and is aliased by first querying for the `foo` and then making sure that the returned resource has the correct `customerTenant`
- TODO: `deleteOneCustomerFoo`: shadow delete, NOT an actual deletion of a resource


`User` reads are the same.  `User` writes are different yet again:
- `updateCustomerUser` is protected by `isCustomerAdmin`, but can only update permissions, e.g. not `firstName`, `lastName`, or `email`
- `updateMe` can be performed by any user on themselves, but cannot, for instance, change their own permissions.


# Technologies Quick Guide

## Prisma Client

### CRUD Operations

From https://github.com/prisma/prisma2/blob/master/docs/data-modeling.md#example
Every _model_ in the data model definition will result in a number of CRUD operations in the generated [Photon API](./photon/api.md):

- `findMany`
- `findOne`
- `create`
- `update`
- `upsert`
- `delete`
- `updateMany`
- `deleteMany`

The operations are accessible via a generated property on the Photon instance. By default the name of the property is the plural, lowercase form of the model name, e.g. `users` for a `User` model or `posts` for a `Post` model.

Here is an example illustrating the use of a `users` property from the [Prisma API](./photon/api.md):

```js
const newUser = await prisma.users.create({
  data: {
    name: 'Alice',
  },
})
const allUsers = await prisma.users.findMany()
```

Note that for Prisma the name of the `users` property is auto-generated using the [`pluralize`](https://github.com/blakeembrey/pluralize) package.

### `schema.prisma`

Type modifiers
The type of a field can be modified by appending either of two modifiers:

[]: Make a field a list
?: Make a field optional
In the main example above, the field name on the User model is optional and the posts field is a list.


