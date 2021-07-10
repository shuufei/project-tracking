import { InjectionToken } from '@angular/core';
import { User } from '@bison/shared/domain';
import { Observable } from 'rxjs';

export interface IMeDataStore {
  me$: () => Observable<User>;
}

export const ME_DATA_STORE = new InjectionToken<IMeDataStore>('MeDataStore');
