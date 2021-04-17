import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface IFetchProjectsService {
  handle$: () => Observable<void>;
}

export const FETCH_PROJECTS_SERVICE = new InjectionToken<IFetchProjectsService>(
  'FetchProjectsService'
);
