import { Project } from '@bison/shared/domain';

export interface ICreateProjectService {
  handle: (input: CreateProjectServiceInput) => Promise<Project>;
}

export const CREATE_PROJECT_SERVICE = Symbol('CreateProjectService');

export type CreateProjectServiceInput = Pick<
  Project,
  'name' | 'description' | 'color' | 'adminUserId'
>;
