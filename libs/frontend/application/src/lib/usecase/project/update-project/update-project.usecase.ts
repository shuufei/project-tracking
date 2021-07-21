import { Injectable } from '@angular/core';
import { Project } from '@bison/shared/schema';
import { Apollo, gql } from 'apollo-angular';
import { IUpdateProjectUsecase } from './update-project.usecase.interface';

@Injectable()
export class UpdateProjectUsecase implements IUpdateProjectUsecase {
  constructor(private apollo: Apollo) {}

  execute(
    ...args: Parameters<IUpdateProjectUsecase['execute']>
  ): ReturnType<IUpdateProjectUsecase['execute']> {
    const [input, { name, fields }] = args;
    return this.apollo.mutate<{ updateProject: Project }>({
      mutation: gql`
        ${fields}
        mutation UpdateProject($input: UpdateProjectInput!) {
          updateProject(input: $input) {
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
