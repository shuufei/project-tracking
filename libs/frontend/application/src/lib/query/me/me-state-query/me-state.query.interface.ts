import { InjectionToken } from '@angular/core';
import { User } from '@bison/shared/domain';
import { Observable } from 'rxjs';

export interface IMeStateQuery {
  me$: () => Observable<User>;
}

export const ME_STATE_QUERY = new InjectionToken<IMeStateQuery>('MeStateQuery');
