/* eslint-disable @typescript-eslint/no-explicit-any */
import { Project, User, UserWithIdpUserId } from '@bison/shared/domain';
import { DynamoDB } from 'aws-sdk';

export const tableName = 'Project_User';
export const gsi1Name = 'GSI1';
export const userIdpUserIdIndexName = 'UserIdpUserIdIndex';
export const typeIndexName = 'TypeIndex';

export type ProjectItem = {
  PK: { S: string };
  SK: { S: string };
  'Project-name': { S: string };
  'Project-description'?: { S: string };
  'Project-color': { S: string };
  'Project-adminUserId': { S: string };
};

export type UserItem = {
  PK: { S: string };
  SK: { S: string };
  'User-name': { S: string };
  'User-icon'?: { S: string };
  'User-idpUserId': { S: string };
};

export type ProjectUserMappingItem = {
  PK: { S: string };
  SK: { S: string };
} & Pick<
  ProjectItem,
  | 'Project-name'
  | 'Project-description'
  | 'Project-color'
  | 'Project-adminUserId'
> &
  Pick<UserItem, 'User-name' | 'User-icon' | 'User-idpUserId'>;

export type ProjectUserItem = ProjectItem | UserItem | ProjectUserMappingItem;

const projectIdPrefix = 'Project-';

const userIdPrefix = 'User-';

export const addProjectIdPrefix = (id: Project['id']) => {
  return `${projectIdPrefix}${id}`;
};

export const addUserIdPrefix = (id: User['id']) => {
  return `${userIdPrefix}${id}`;
};

const removeProjectIdPrefix = (value: string) => {
  return value.replace(projectIdPrefix, '');
};

const removeUserIdPrefix = (value: string) => {
  return value.replace(userIdPrefix, '');
};

export const isProjectItem = (item: ProjectUserItem): item is ProjectItem => {
  return (
    (item as any)['Project-name'] != null && (item as any)['User-name'] == null
  );
};

export const isUserItem = (item: ProjectUserItem): item is UserItem => {
  return (
    (item as any)['User-name'] != null && (item as any)['Project-name'] == null
  );
};

export const isProjectUserItem = (
  item: ProjectUserItem
): item is ProjectUserMappingItem => {
  return (
    (item as any)['User-name'] != null && (item as any)['Project-name'] != null
  );
};

export const convertToDomainProjectFromDbProjectItem = (
  item: ProjectItem
): Project => {
  return {
    id: removeProjectIdPrefix(item.PK.S),
    name: item['Project-name'].S,
    description: item['Project-description']?.S,
    color: item['Project-color'].S as Project['color'],
    adminUserId: item['Project-adminUserId']?.S,
  };
};

export const convertToDomainProjectFromDbProjectUserMappingItem = (
  item: ProjectUserMappingItem
): Project => {
  return {
    id: removeProjectIdPrefix(item.PK.S),
    name: item['Project-name'].S,
    description: item['Project-description']?.S,
    color: item['Project-color'].S as Project['color'],
    adminUserId: item['Project-adminUserId']?.S,
  };
};

export const convertToDomainUserFromDbProjectUserMappingItem = (
  item: ProjectUserMappingItem
): User => {
  return {
    id: removeUserIdPrefix(item.SK.S),
    name: item['User-name'].S,
    icon: item['User-icon']?.S,
  };
};

export const convertToDbProjectItemFromDomainProject = (
  project: Project
): DynamoDB.AttributeMap => {
  const item: DynamoDB.AttributeMap = {
    PK: { S: addProjectIdPrefix(project.id) },
    SK: { S: addProjectIdPrefix(project.id) },
    'Project-name': { S: project.name },
    'Project-color': { S: project.color },
  };
  if (project.description != null) {
    item['Project-description'] = {
      S: project.description,
    };
  }
  if (project.adminUserId != null) {
    item['Project-adminUserId'] = {
      S: project.adminUserId,
    };
  }
  return item;
};

export const convertToDomainUserWithIdpUserIdFromDbUserItem = (
  item: UserItem
): UserWithIdpUserId => {
  return {
    id: removeUserIdPrefix(item.PK.S),
    name: item['User-name'].S,
    icon: item['User-icon']?.S,
    idpUserId: item['User-idpUserId'].S,
  };
};

export const convertToDbProjectUserMappingItemFromDomainProjectUser = (
  project: Project,
  user: UserWithIdpUserId
): DynamoDB.AttributeMap => {
  const item: DynamoDB.AttributeMap = {
    PK: { S: addProjectIdPrefix(project.id) },
    SK: { S: addUserIdPrefix(user.id) },
    'Project-name': { S: project.name },
    'Project-color': { S: project.color },
    'User-name': { S: user.name },
    'User-idpUserId': { S: user.idpUserId },
  };
  if (project.description != null) {
    item['Project-description'] = {
      S: project.description,
    };
  }
  if (project.adminUserId != null) {
    item['Project-adminUserId'] = {
      S: project.adminUserId,
    };
  }
  if (user.icon != null) {
    item['User-icon'] = {
      S: user.icon,
    };
  }
  return item;
};
