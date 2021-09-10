import { Injectable } from '@angular/core';
import { User } from '@bison/shared/schema';
import { Apollo, gql } from 'apollo-angular';
import {
  CreateProjectResponse,
  ICreateProjectUsecase,
} from './create-project.usecase.interface';

@Injectable()
export class CreateProjectUsecase implements ICreateProjectUsecase {
  constructor(private apollo: Apollo) {}
  execute(
    ...args: Parameters<ICreateProjectUsecase['execute']>
  ): ReturnType<ICreateProjectUsecase['execute']> {
    const [input] = args;
    const createdProject: CreateProjectResponse = {
      id: 'tmp-id',
      name: input.name,
      description: input.description,
      color: input.color,
      admin: {
        id: input.adminUserId,
        __typename: 'User',
      },
      __typename: 'Project',
    };
    return this.apollo.mutate<{ createProject: CreateProjectResponse }>({
      mutation: gql`
        mutation CreateProject($input: CreateProjectInput!) {
          createProject(input: $input) {
            id
            name
            description
            color
            admin {
              id
            }
          }
        }
      `,
      variables: {
        input,
      },
      optimisticResponse: {
        createProject: createdProject,
      },
      update(cache, response) {
        const query = gql`
          query Viewer {
            viewer {
              id
              projects {
                id
              }
            }
          }
        `;
        const data = cache.readQuery<{ viewer: User }>({
          query: query,
        });
        const projects = [
          ...(data?.viewer.projects ?? []),
          response.data?.createProject,
        ];
        cache.writeQuery({
          query: query,
          data: {
            ...data,
            viewer: {
              ...data?.viewer,
              projects,
            },
          },
        });
      },
    });
  }
}
