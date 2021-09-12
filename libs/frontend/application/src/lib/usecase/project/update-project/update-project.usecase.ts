import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import {
  IUpdateProjectUsecase,
  UpdateProjectResponse,
} from './update-project.usecase.interface';

@Injectable()
export class UpdateProjectUsecase implements IUpdateProjectUsecase {
  constructor(private apollo: Apollo) {}

  execute(
    ...args: Parameters<IUpdateProjectUsecase['execute']>
  ): ReturnType<IUpdateProjectUsecase['execute']> {
    const [input] = args;
    const updatedProject: UpdateProjectResponse = {
      id: input.id,
      name: input.name,
      description: input.description,
      color: input.color,
      admin: {
        id: input.adminUserId,
        __typename: 'User',
      },
      __typename: 'Project',
    };
    return this.apollo.mutate<{ updateProject: UpdateProjectResponse }>({
      mutation: gql`
        mutation UpdateProject($input: UpdateProjectInput!) {
          updateProject(input: $input) {
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
      optimisticResponse: {
        updateProject: updatedProject,
      },
      variables: {
        input,
      },
    });
  }
}
