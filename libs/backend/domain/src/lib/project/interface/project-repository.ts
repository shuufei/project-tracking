import { Project } from '@bison/shared/domain';

export interface IProjectRepository {
  getById: (id: ProjectEntity['id']) => Promise<GetResponse>;
  list: (first: number, cursor?: ProjectEntity['id']) => Promise<ListResponse>;
}

export type ProjectEntity = Pick<
  Project,
  'id' | 'name' | 'description' | 'color'
>;

export const PROJECT_REPOSITORY = Symbol('ProjectRepository');

export type GetResponse = {
  entity: ProjectEntity;
};

export type ListResponse = {
  entities: ProjectEntity[];
  nextCursor?: ProjectEntity['id'];
};
