import { Project as DomainProject, User } from '@bison/shared/domain';

export type Project = Pick<
  DomainProject,
  'id' | 'name' | 'description' | 'color'
> & {
  admin: Pick<User, 'id' | 'name' | 'icon'>;
  members: Pick<User, 'id' | 'name' | 'icon'>[];
};
