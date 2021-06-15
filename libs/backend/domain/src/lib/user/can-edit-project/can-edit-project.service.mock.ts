import { MockReturnValues } from '@bison/types/testing';
import { ICanEditProjectService } from './can-edit-project.service.interface';

export const mockCanEditProjectServiceReturnValues: MockReturnValues<ICanEditProjectService> = {
  handle: true,
};

export class MockCanEditProjectService implements ICanEditProjectService {
  async handle() {
    return mockCanEditProjectServiceReturnValues.handle;
  }
}
