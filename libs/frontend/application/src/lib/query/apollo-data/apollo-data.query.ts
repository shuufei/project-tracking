import { Injectable } from '@angular/core';
import { User } from '@bison/shared/schema';
import { Apollo, gql } from 'apollo-angular';
import { IApolloDataQuery } from './apollo-data.query.interface';

@Injectable()
export class ApolloDataQuery implements IApolloDataQuery {
  constructor(private apollo: Apollo) {}

  queryViewer(
    ...args: Parameters<IApolloDataQuery['queryViewer']>
  ): ReturnType<IApolloDataQuery['queryViewer']> {
    const [{ name, fields }, options] = args;
    return this.apollo.watchQuery<{ viewer?: User }>({
      ...options,
      query: gql`
        ${fields}
        query ViewerQuery {
          viewer {
            ...${name}
          }
        }
      `,
    }).valueChanges;
  }

  queryUsers(
    ...args: Parameters<IApolloDataQuery['queryUsers']>
  ): ReturnType<IApolloDataQuery['queryUsers']> {
    const [{ name, fields }, options] = args;
    return this.apollo.watchQuery<{ users: User[] }>({
      ...options,
      query: gql`
        ${fields}
        query UsersQuery {
          users {
            ...${name}
          }
        }
      `,
    }).valueChanges;
  }
}
