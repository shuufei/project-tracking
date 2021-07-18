import { Injectable } from '@angular/core';
import { Reference, StoreObject } from '@apollo/client';
import { Project, User } from '@bison/shared/schema';
import { Apollo, gql } from 'apollo-angular';
import { IDeleteProjectUsecase } from './delete-project.usecase.interface';

@Injectable()
export class DeleteProjectUsecase implements IDeleteProjectUsecase {
  constructor(private apollo: Apollo) {}

  execute(
    ...args: Parameters<IDeleteProjectUsecase['execute']>
  ): ReturnType<IDeleteProjectUsecase['execute']> {
    const [input, { name, fields }] = args;
    return this.apollo.mutate<{ deleteProject: Project }>({
      mutation: gql`
        ${fields}
        mutation DeleteProject($input: DeleteProjectInput!) {
          deleteProject(input: $input) {
            ...${name}
          }
        }
      `,
      variables: {
        input,
      },
      update(cache) {
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
        const data = cache.readQuery<{ viewer: User & StoreObject }>({
          query,
        });
        if (data == null) {
          return;
        }
        cache.modify({
          id: cache.identify(data.viewer),
          fields: {
            projects(projectRefs: Reference[], { readField }) {
              return projectRefs.filter(
                (ref) => readField('id', ref) !== input.id
              );
            },
          },
        });
        return;
      },
    });
  }
}
