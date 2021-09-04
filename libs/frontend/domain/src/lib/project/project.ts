import { Board, Project as DomainProject, User } from '@bison/shared/domain';

export type Project = Pick<
  DomainProject,
  'id' | 'name' | 'description' | 'color'
> & {
  admin: Pick<User, 'id' | 'name' | 'icon'>;
  members: Pick<User, 'id' | 'name' | 'icon'>[];
  boards: (Pick<
    Board,
    'id' | 'name' | 'description' | 'projectId' | 'tasksOrder'
  > & {
    createdAt: Date;
  })[];
};
