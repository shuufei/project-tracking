import { Inject, Injectable } from '@angular/core';
import {
  IMeDataStore,
  IProjectDataStore,
  ME_DATA_STORE,
  PROJECT_DATA_STORE,
} from '@bison/frontend/domain';
import { IStateQuery } from './state.query.interface';

@Injectable()
export class StateQuery implements IStateQuery {
  constructor(
    @Inject(ME_DATA_STORE) private readonly meDataStore: IMeDataStore,
    @Inject(PROJECT_DATA_STORE)
    private readonly projectDataStore: IProjectDataStore
  ) {}

  me$() {
    return this.meDataStore.me$();
  }

  projects$() {
    return this.projectDataStore.projects$();
  }
}
