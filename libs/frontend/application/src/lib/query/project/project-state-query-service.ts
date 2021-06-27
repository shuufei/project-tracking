import { Inject, Injectable } from '@angular/core';
import { IProjectDataStore, PROJECT_DATA_STORE } from '@bison/frontend/domain';
import { IProjectStateQueryService } from './interface/project-state-query-service';

@Injectable()
export class ProjectStateQueryService implements IProjectStateQueryService {
  constructor(
    @Inject(PROJECT_DATA_STORE) private projectDataStore: IProjectDataStore
  ) {}

  projects$() {
    return this.projectDataStore.projects$();
  }
}
