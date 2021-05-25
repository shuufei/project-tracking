import { ERROR_CODE } from '@bison/shared/constants';
import { BaseError } from './base-error';
export class PermissionDeniedError extends BaseError {
  constructor(message = 'Permission Denied') {
    super(ERROR_CODE.xxx, message);
  }
}
