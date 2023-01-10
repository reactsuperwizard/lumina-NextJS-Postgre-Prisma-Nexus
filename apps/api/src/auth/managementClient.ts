import { ManagementClient } from 'auth0'

export const managementClient = new ManagementClient({
  domain: 'dev-2fat32cy.auth0.com',
  clientId: process.env.AUTH0_CLIENT_ID || '1234', // fake this during the build process
  clientSecret: process.env.AUTH0_CLIENT_SECRET || '1234', // fake this during the build process
})
