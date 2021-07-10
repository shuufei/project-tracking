import { InjectionToken } from '@angular/core';
import { Project } from '@bison/frontend/domain';
import { User } from '@bison/shared/domain';
import { Observable } from 'rxjs';

export interface IStateQuery {
  me$: () => Observable<User>;
  projects$: () => Observable<Project[]>;
}

export const STATE_QUERY = new InjectionToken<IStateQuery>('StateQuery');
