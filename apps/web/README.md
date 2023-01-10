# Lumina Web

## Intro

All web apps that live at app.lumina.co!!!

## Quick Start

```
# fork this repo
git clone <your-fork>
git checkout -b feature-<something-cool>
# follow all setup instructions found at the root project level
# create .env file from .env.template and uncomment correct api url
cp .env.template .env
# run the dev server
yarn dev
# app running at localhost:3000
# hack away
```

## Status

- Admin app lives at https://app.lumina.local:3000/admin.
- Portal app lives at https://app.lumina.local:3000/@lumina (where "lumina" is the name of the customer).

This is a next.js app.

### Overview

The web application is essentially two apps in one: Admin & Portal. Portal is the customer-facing portion of the app, Admin is the tool used by Lumina employees to track customer information and script videos (more on that later).

### State

In both apps, state management is handled locally where possible with all app level data handled by providers (`modules/providers`) interacted with via custom hooks (`modules/hooks`). Providers are passed to both apps via `pages/_app.tsx`. The one more complex local state usage is in the form where admin users update scripts `modules/admin/scripts/ScriptEdit`. In order to prevent extra loads of the UI, the [react-hook-form](https://www.react-hook-form.com/api/) library is used here.

### Authentication with Auth0

We use a multi tenant authentication scheme.

Tenants are stored on a user in auth0 with the customer's corresponding "tenant" (`Customer.tenant`) which is immutable.

```
    app_metadata: 
    
    {
      "tenants": {
        "lumina": {
          "role": "admin"
        },
        ...
      }
    }
```

The tenant `"lumina"` has read/write access to all customers.

The user will have access to information for all customers they are associated with.

In the api, all graphql requests will be checked before data is returned.

For example, if a user makes a request to `app.lumina.co/@acmeinc/order/[id]` the corresponding graphql request will be something like:

```graphql
query {
  getCustomerOrder(where: { id: orderId }) {
    ...
  }
}
```

The result of the query is then checked for the `Order.customerTenant` and if the user's auth token does not contain:

```
  {
     .   ..
    "tenants": {
      "acme-inc": {
        "role": "admin",
      },
      ...
    }
  }
```

the request will fail with Authorization.

In most cases, the `Customer.slug` (`@acmeinc` in the example above) will match the `Customer.tenant` (`acme-inc` above). However the slug can be changed where as the tenant is immutable.

See api docs for more information.

### Queries

Apollo is used to access our database throughout the web applications. Most data is loaded/updated via Apollo’s useQuery/useMutation hooks. The queries and mutations themselves are written as gql string literals and located as close to where they are used as possible while still keeping things dry. Type declarations for gql statements should be written alongside the gql statement and should reflect the exact shape of the expected data. These should look as follows:

```
const EXAMPLE_QUERY = gql`
  query example($where: ExampleWhereUniqueInput!) {
    example(where: $where) {
      id
      name
      other {
        id
        name
      }
    }
  }`

interface ExampleQuery extends Pick< ExampleType, 'id' | 'name' > {
  other: Pick< OtherType, 'id' | 'name' >
}
```

Typing for simpler queries without nested data can be written as follows:

```
type ExampleQuery = Pick<ExampleType, 'id' | 'name' >
```

Queries made from Portal should use the tenant protected version of the query (typically `getCustomerExample` in place of `example`). For more info, see the Authorization section of [API Readme](../api/README.md#Authorization)

### Styling

Styling is handled via the Material UI makeStyles hook and should be written near the top of the component file (after imports).

## Lumina API

For development, you will hit the lumina-api app deployed to:

- Dev: [`https://dev.api.lumina.co`](https://dev.api.lumina.co)
- Local: [`http://127.0.0.1:4000`](http://127.0.0.1:4000)

Occasionally:

- Next: [`https://next.api.lumina.co`](https://next.api.lumina.co)

And almost never:

- Production: [`https://api.lumina.co`](https://api.lumina.co)

Apollo Client makes `POST` requests to this endpoint. Making a `GET` request (e.g. visiting it in a browser) while working off `Local` will take you to the playground with all available queries and mutations, as well as schema documentation.