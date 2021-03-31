import { Project } from '@bison/shared/domain';

export interface IListProjectsUsecase {
  execute: () => Promise<Project[]>;
}
export const LIST_PROJECTS_USECASE = Symbol('ListProjectsUsecase');
