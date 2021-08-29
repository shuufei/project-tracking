import { v4 } from 'uuid';
import { boardId_Sprint202101 } from './board';
import { userId_NaokiOota, userId_ShuuheiHanashiro } from './project-user';

export const taskGroupId_ImplementAPI = v4();
export const taskGroup_ImplementAPI = {
  id: taskGroupId_ImplementAPI,
  title: 'API実装',
  description: 'GraphQL API実装',
  status: 'INPROGRESS',
  assignUserId: userId_ShuuheiHanashiro,
  boardId: boardId_Sprint202101,
  scheduledTimeSec: 60 * 60 * 16,
  tasksOrder: [
    // TODO
  ],
  createdAt: new Date('2021-01-01T18:00:00Z').valueOf(),
};

export const taskGroupId_ImplementUI = v4();
export const taskGroup_ImplementUI = {
  id: taskGroupId_ImplementUI,
  title: 'UI実装',
  description: 'AngularによるUI実装',
  status: 'INPROGRESS',
  assignUserId: userId_NaokiOota,
  boardId: boardId_Sprint202101,
  scheduledTimeSec: 60 * 60 * 19.5,
  tasksOrder: [
    // TODO
  ],
  createdAt: new Date('2021-01-01T18:10:00Z').valueOf(),
};
