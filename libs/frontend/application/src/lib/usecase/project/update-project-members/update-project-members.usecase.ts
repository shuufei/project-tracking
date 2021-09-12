import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import {
  IUpdateProjectMembersUsecase,
  UpdateProjectMembersResponse,
} from './update-project-members.usecase.interface';

@Injectable()
export class UpdateProjectMembersUsecase
  implements IUpdateProjectMembersUsecase {
  constructor(private apollo: Apollo) {}

  execute(
    ...args: Parameters<IUpdateProjectMembersUsecase['execute']>
  ): ReturnType<IUpdateProjectMembersUsecase['execute']> {
    const [input, memberIds] = args;
    const updatedProject: UpdateProjectMembersResponse = {
      id: input.projectId,
      members: memberIds.map((id) => ({
        id,
        __typename: 'User',
      })),
      __typename: 'Project',
    };
    return this.apollo.mutate<{
      updateProjectMembers: UpdateProjectMembersResponse;
    }>({
      mutation: gql`
        mutation UpdateProjectMembers($input: UpdateProjectMembersInput!) {
          updateProjectMembers(input: $input) {
            id
            members {
              id
            }
          }
        }
      `,
      variables: {
        input,
      },
      optimisticResponse: {
        updateProjectMembers: updatedProject,
      },
    });
  }
}
