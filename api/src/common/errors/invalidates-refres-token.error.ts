export class InvalidatedRefreshTokenError extends Error {
  constructor() {
    super('Refresh token has been invalidated.');
    this.name = 'InvalidatedRefreshTokenError';
  }
}