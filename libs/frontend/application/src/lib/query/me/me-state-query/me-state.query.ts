import { Inject, Injectable } from '@angular/core';
import { IMeDataStore, ME_DATA_STORE } from '@bison/frontend/domain';
import { IMeStateQuery } from './me-state.query.interface';

@Injectable()
export class MeStateQuery implements IMeStateQuery {
  constructor(@Inject(ME_DATA_STORE) private meDataStore: IMeDataStore) {}

  me$() {
    return this.meDataStore.me$();
  }
}
