// import { createError } from 'apollo-errors'
import { ApolloError } from 'apollo-server-lambda'

const NotAuthorizedError = new ApolloError(
  'User does not have correct permissions.',
  'NotAuthorizedError',
)

const InvalidTokenError = new ApolloError(
  'The token provided is invalid.',
  'InvalidToken',
)

const WrongCredentialsError = new ApolloError(
  'The provided credentials are invalid.',
  'WrongCredentialsError',
)

const Auth0RateLimitError = new ApolloError(
  'Too many requests to Auth0.',
  'Auth0RateLimitError',
)

export {
  NotAuthorizedError,
  InvalidTokenError,
  WrongCredentialsError,
  Auth0RateLimitError,
}
