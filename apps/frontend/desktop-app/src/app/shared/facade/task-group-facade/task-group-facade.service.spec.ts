import { TestBed } from '@angular/core/testing';

import { TaskGroupFacadeService } from './task-group-facade.service';

describe('TaskGroupFacadeService', () => {
  let service: TaskGroupFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskGroupFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
