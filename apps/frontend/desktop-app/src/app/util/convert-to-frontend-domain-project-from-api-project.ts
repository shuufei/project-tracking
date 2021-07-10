import { Project } from '@bison/frontend/domain';
import { Project as ApiProject } from '@bison/shared/schema';
import { convertToDomainColorFromApiColor } from './convert-to-domain-color-from-api-color';

export const convertToFrontendDomainProjectFromApiProject = (
  project: ApiProject
): Project => {
  const { id, name, description, color, members, admin } = project;
  return {
    id,
    name,
    description,
    color: convertToDomainColorFromApiColor(color),
    admin: {
      id: admin.id,
      name: admin.name,
      icon: admin.icon,
    },
    members: members.map((member) => ({
      id: member.id,
      name: member.name,
      icon: member.icon,
    })),
  };
};
