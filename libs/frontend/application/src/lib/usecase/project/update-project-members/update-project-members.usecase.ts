import { Injectable } from '@angular/core';
import { Project } from '@bison/shared/schema';
import { Apollo, gql } from 'apollo-angular';
import { IUpdateProjectMembersUsecase } from './update-project-members.usecase.interface';

@Injectable()
export class UpdateProjectMembersUsecase
  implements IUpdateProjectMembersUsecase {
  constructor(private apollo: Apollo) {}

  execute(
    ...args: Parameters<IUpdateProjectMembersUsecase['execute']>
  ): ReturnType<IUpdateProjectMembersUsecase['execute']> {
    const [input, { name, fields }] = args;
    return this.apollo.mutate<{ updateProjectMembers: Project }>({
      mutation: gql`
        ${fields}
        mutation UpdateProjectMembers($input: UpdateProjectMembersInput!) {
          updateProjectMembers(input: $input) {
            ...${name}
          }
        }
      `,
      variables: {
        input,
      },
    });
  }
}
