import { InjectionToken } from '@angular/core';
import { ApolloQueryResult, WatchQueryFetchPolicy } from '@apollo/client';
import { User } from '@bison/shared/schema';
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
}

export const APOLLO_DATA_QUERY = new InjectionToken<IApolloDataQuery>(
  'ApolloDataQuery'
);
