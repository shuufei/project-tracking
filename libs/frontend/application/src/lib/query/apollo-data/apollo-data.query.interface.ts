import { InjectionToken } from '@angular/core';
import {
  ApolloQueryResult,
  DocumentNode,
  WatchQueryFetchPolicy,
} from '@apollo/client';
import { User } from '@bison/shared/schema';
import { Observable } from 'rxjs';

export type QueryOptions = {
  fetchPolicy: WatchQueryFetchPolicy;
};

export type QueryArgs = [
  framgnet: { name: string; fields: DocumentNode },
  options?: QueryOptions
];

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
