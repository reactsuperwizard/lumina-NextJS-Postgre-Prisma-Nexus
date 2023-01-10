# Lumina Mono [![Build Status](https://travis-ci.com/hdngr/midas-mono.svg?token=WPsXbn61xSggtLVTksDx&branch=master)](https://travis-ci.com/hdngr/midas-mono)

This repo contains the five lumina apps, each in the `./apps` folder.

## Start with Why

The `api` is a strongly typed, graphql backend. `web` and `render` consumed [types generated](./apps/api/generated/types.ts)
by the `api`. Additionally, `web` consumes [types from `render`](./apps/render/src/types.ts) that relate to how render jobs are constructed and fed to AE Templates. Types can be used to enhance DX - knowing what properties exist on a given object - and to ease the burden on integration/dependency related errors when there are changes to `api` or how it is consumed by `render`.

## Quickstart

This repo uses workspaces and the root `package.json` file contains shim commands for each app. For example, `yarn web foo` will run `foo` script commands stored in `./apps/web/package.json`, `yarn api bar` will run the `bar` script from the `./apps/api/package.json` file.

```
# make sure to run `yarn install` or `yarn` from the ./mono-repo not ./mono-repo/apps/api
# serverless requires that packages be properly symlinked or it will attempt to package dev dependencies
yarn install
# add .env files to appropriate app

# web
yarn web dev

# api
yarn api dev
# set MIDAS_API_ENDPOINT="http://127.0.0.1:4000" in ./apps/web/.env to develop web app based on local api
```

## Development

Install the Prettier extension for .vscode. This will use configuration in .vscode folder to automatically format files on save based on .eslintrc.js configuration.
If you suspect your code is not linted, try yarn lint.

## Development Workflow

We use a fork and PR workflow. You can read about it [here](https://gist.github.com/Chaser324/ce0505fbed06b947d962).

Generally, you will work on some feature in `<your-forked-repo>/<feature-something-cool-branch>`. Make meaningful commits to your branch and at avery minimum push to your remote daily. When the feature is ready, or almost ready, open a PR for review against `hdngr/next`. When the PR is merged, it will automatically deploy to [`next.app.lumina.co](https://next.app.lumina.co). QA the staging app, and then open a PR from `hdngr/next` to `hdngr/master`. `hdngr/master` automatically deploys to [`app.lumina.co`](https://app.lumina.co).

## Testing

Install [`vscode-jest](https://github.com/jest-community/vscode-jest)! Super helpful.

Jest runs all tests from files named `*.spec.ts(x)`. Store your tests in a folder called `__tests__` and name them after the file they are testing. So, to test the following file `./users/UserCreate.tsx` you'd create the test `./users/__tests__/UserCreate.spec.tsx`. You should have a snap shot test in their, which will create the following snapshot, `./users/__tests__/__snapshots__/UserCreate.spec.tsx.snap`.

## Preparing localhost

In order to run the app as ```https://...``` on a local machine (a requirement for proper auth behavior), you will need to update your machine's host file.  
* On Mac, this is found at ```/private/etc/hosts```
* On Windows, this is found at ```c:\windows\system32\drivers\etc\hosts```

Locate your file and add the following: ```127.0.0.1 app.lumina.local``` (this will require sudo/admin privileges)

Next, the following certificate from our repo needs to be added to your keychain: ```apps/web/certs/app.lumina.local.crt```

If you run into trouble, reach out to another engineer or follow [this tutorial](https://medium.com/responsetap-engineering/nextjs-https-for-a-local-dev-server-98bb441eabd7) 

## Overview

# APP Level Readme Files

[API Readme](./apps/api/README.md)

[Web Readme](./apps/web/README.md)

[Render Readme](./apps/render/README.md)

[Player Readme](./apps/player/README.md)

[Vanity Readme](./apps/vanity/README.md)

## Assorted Admin tasks

These tasks will likely require updating as details of implementation change

- Giving a new Lumina employee Admin permissions:
  1. Add user to Lumina app with Customer as `Lumina` and role as `Admin`
  2. Go to `https://manage.auth0.com/dashboard/us/dev-2fat32cy/`
  3. Go to `User Management` > `Users`
  4. Search for and find the matching email
  5. Select `Roles` from the tabs and use the dropdown to select `ADMIN`
  6. Let employee know and remind them that they will need to log out/in for changes to take effect if they had already logged in

- Steps for adding additional fields to the database
  1. Verify that `apps/api/prisma/.env` is pointed at the desired DB
  2. Add desired changes to `apps/api/prisma/schema.prisma`
  3. Run the following commands:
    - `yarn`
    - `yarn api generate`
    - `yarn api prisma migrate dev --create-only --preview-feature`
  4. Evaluate the `migration.sql` file inside the newly created folder and update if needed
  5. Run `yarn api prisma migrate dev --preview-feature` to run the new migration on the selected DB
  6. To migrate production after merging changes to the respective branch, verify `.env` is pointing to the proper DB and run `yarn api prisma migrate deploy --preview-feature`