import { TestBed } from '@angular/core/testing';

import { SubtaskFacadeService } from './subtask-facade.service';

describe('SubtaskFacadeService', () => {
  let service: SubtaskFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubtaskFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
