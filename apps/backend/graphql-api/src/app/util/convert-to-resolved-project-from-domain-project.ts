import { Project as DomainProject } from '@bison/shared/domain';
import { ResolvedProject } from '../resolvers/resolved-value-type';
import { convertToApiColorFromDomainColor } from './convert-to-color-from-domain-color';

export const convertToResolvedProjectFromDomainProject = (
  project: DomainProject
): ResolvedProject => {
  return {
    ...project,
    color: convertToApiColorFromDomainColor(project.color),
    admin: {
      id: project.adminUserId,
    },
  };
};
