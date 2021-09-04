import { Project } from '@bison/frontend/domain';
import { Project as ApiProject } from '@bison/shared/schema';
import { convertToDomainColorFromApiColor } from './convert-to-domain-color-from-api-color';
import { convertToDomainTaskTypeFromApiTaskType } from './convert-to-domain-task-type-from-api-task-type';

export const convertToFrontendDomainProjectFromApiProject = (
  project: ApiProject
): Project => {
  const { id, name, description, color, members, admin, boards } = project;
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
    boards: boards.map((board) => ({
      id: board.id,
      name: board.name,
      description: board.description,
      projectId: board.project.id,
      createdAt: new Date(board.createdAt),
      tasksOrder: board.tasksOrder.map((orderItem) => ({
        taskId: orderItem.taskId,
        type: convertToDomainTaskTypeFromApiTaskType(orderItem.type),
      })),
    })),
  };
};
