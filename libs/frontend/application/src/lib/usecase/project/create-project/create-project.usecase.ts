import { Injectable } from '@angular/core';
import { Project, User } from '@bison/shared/schema';
import { Apollo, gql } from 'apollo-angular';
import { ICreateProjectUsecase } from './create-project.usecase.interface';

@Injectable()
export class CreateProjectUsecase implements ICreateProjectUsecase {
  constructor(private apollo: Apollo) {}
  execute(
    ...args: Parameters<ICreateProjectUsecase['execute']>
  ): ReturnType<ICreateProjectUsecase['execute']> {
    const [input, { name, fields }] = args;
    return this.apollo.mutate<{ createProject: Project }>({
      mutation: gql`
        ${fields}
        mutation CreateProject($input: CreateProjectInput!) {
          createProject(input: $input) {
            ...${name}
          }
        }
      `,
      variables: {
        input,
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
