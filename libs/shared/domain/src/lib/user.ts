import { createId, Id } from './id';

export type User = {
  id: Id;
  name: string;
  icon?: string;
};

export const createUser = (name: User['name'], icon?: User['icon']): User => ({
  id: createId(),
  name,
  icon,
});
