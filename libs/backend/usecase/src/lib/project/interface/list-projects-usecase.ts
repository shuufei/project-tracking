import { Project } from '@bison/shared/domain';

export interface IListProjectsUsecase {
  execute: (
    first: number,
    after?: Project['id']
  ) => Promise<ListProjectsResponse>;
}
export const LIST_PROJECTS_USECASE = Symbol('ListProjectsUsecase');

export type ListProjectsResponse = {
  projects: Pick<Project, 'id' | 'name' | 'description' | 'color'>[];
  nextCursor?: Project['id'];
};
