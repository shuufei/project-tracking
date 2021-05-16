export class InvalidCognitoAuthenticationProviderError extends Error {
  constructor() {
    super('CognitoAuthenticationProvider is undefined or invalid.');
  }
}
