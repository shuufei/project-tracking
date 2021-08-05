import { InjectionToken } from '@angular/core';
import { ApolloQueryResult, WatchQueryFetchPolicy } from '@apollo/client';
import { Subtask, TaskGroup, User } from '@bison/shared/schema';
import { Observable } from 'rxjs';
import { Fragment } from '../../types';

export type QueryOptions = {
  fetchPolicy?: WatchQueryFetchPolicy;
  nextFetchPolicy?: WatchQueryFetchPolicy;
};

export type QueryArgs = [framgnet: Fragment, options?: QueryOptions];

export interface IApolloDataQuery {
  queryViewer: (
    ...args: QueryArgs
  ) => Observable<ApolloQueryResult<{ viewer?: User }>>;
  queryUsers: (
    ...args: QueryArgs
  ) => Observable<ApolloQueryResult<{ users: User[] }>>;

  queryTaskGroup: (
    fragment: Fragment,
    taskGroupId: TaskGroup['id'],
    options?: QueryOptions
  ) => Observable<ApolloQueryResult<{ taskGroup?: TaskGroup }>>;

  querySubtask: (
    fragment: Fragment,
    subtaskId: Subtask['id'],
    options?: QueryOptions
  ) => Observable<ApolloQueryResult<{ subtask?: Subtask }>>;
}

export const APOLLO_DATA_QUERY = new InjectionToken<IApolloDataQuery>(
  'ApolloDataQuery'
);
