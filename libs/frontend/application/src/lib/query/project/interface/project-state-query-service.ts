import { InjectionToken } from '@angular/core';
import { Project } from '@bison/shared/domain';
import { Observable } from 'rxjs';

export interface IProjectStateQueryService {
  projects$: () => Observable<Projects>;
}

export type Projects = Project[];

export const PROJECT_STATE_QUERY_SERVICE = new InjectionToken<IProjectStateQueryService>(
  'ProjectStateQueryService'
);
