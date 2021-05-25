import { MockReturnValues } from '@bison/types/testing';
import { ICanAccessProjectService } from './can-access-project.service.interface';
export const mockCanAccessProjectServiceReturnValues: MockReturnValues<ICanAccessProjectService> = {
  handle: true,
};

export class MockCanAccessProjectService implements ICanAccessProjectService {
  async handle() {
    return mockCanAccessProjectServiceReturnValues.handle;
  }
}
