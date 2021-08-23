import { Injectable } from '@angular/core';
import { Project, Subtask, Task, TaskGroup, User } from '@bison/shared/schema';
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

  queryTaskGroup(
    ...args: Parameters<IApolloDataQuery['queryTaskGroup']>
  ): ReturnType<IApolloDataQuery['queryTaskGroup']> {
    const [{ name, fields }, id, options] = args;
    return this.apollo.watchQuery<{ taskGroup?: TaskGroup }>({
      ...options,
      query: gql`
        ${fields}
        query TaskGroupQuery($id: ID!) {
          taskGroup(id: $id) {
            ...${name}
          }
        }
      `,
      variables: {
        id,
      },
    }).valueChanges;
  }

  querySubtask(
    ...args: Parameters<IApolloDataQuery['querySubtask']>
  ): ReturnType<IApolloDataQuery['querySubtask']> {
    const [{ name, fields }, id, options] = args;
    return this.apollo.watchQuery<{ subtask?: Subtask }>({
      ...options,
      query: gql`
        ${fields}
        query SubtaskQuery($id: ID!) {
          subtask(id: $id) {
            ...${name}
          }
        }
      `,
      variables: {
        id,
      },
    }).valueChanges;
  }

  queryTask(
    ...args: Parameters<IApolloDataQuery['queryTask']>
  ): ReturnType<IApolloDataQuery['queryTask']> {
    const [fragment, id, options] = args;
    return this.apollo.watchQuery<{ task?: Task }>({
      ...options,
      query: gql`
        ${fragment.fields}
        query TaskQuery($id: ID!) {
          task(id: $id) {
            ...${fragment.name}
          }
        }
      `,
      variables: {
        id,
      },
    }).valueChanges;
  }

  queryProject(
    ...args: Parameters<IApolloDataQuery['queryProject']>
  ): ReturnType<IApolloDataQuery['queryProject']> {
    const [{ name, fields }, id, options] = args;
    return this.apollo.watchQuery<{ project?: Project }>({
      ...options,
      query: gql`
        ${fields}
        query ProjectQuery($id: ID!) {
          project(id: $id) {
            ...${name}
          }
        }
      `,
      variables: {
        id,
      },
    }).valueChanges;
  }
}
