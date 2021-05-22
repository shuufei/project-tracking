import { ErrorCode } from '@bison/shared/constants';

export class BaseError extends Error {
  constructor(public readonly errorCode: ErrorCode, message: string) {
    super(message);
  }
}

new Error();
