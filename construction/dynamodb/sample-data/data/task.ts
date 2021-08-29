import { v4 } from 'uuid';
import { boardId_Sprint202101 } from './board';
import {
  userId_KeitaSakai,
  userId_KentaToshima,
  userId_NaokiOota,
  userId_ShuuheiHanashiro,
} from './project-user';
import {
  taskGroupId_ImplementAPI,
  taskGroupId_ImplementUI,
} from './task-group';

export const taskId_queryTask = v4();
export const task_queryTask = {
  id: taskId_queryTask,
  title: 'Query Task',
  description: 'Query Taskの実装',
  status: 'DONE',
  assignUserId: userId_ShuuheiHanashiro,
  boardId: boardId_Sprint202101,
  taskGroupId: taskGroupId_ImplementAPI,
  workTimeSec: 60 * 60 * 2.5,
  scheduledTimeSec: 60 * 60 * 3,
  subtasksOrder: [
    // TODO
  ],
  createdAt: new Date('2021-01-01T18:00:10Z').valueOf(),
};

export const taskId_querySubtask = v4();
export const task_querySubtask = {
  id: taskId_querySubtask,
  title: 'Query Subtask',
  description: 'Query Subtaskの実装',
  status: 'DONE',
  assignUserId: userId_ShuuheiHanashiro,
  boardId: boardId_Sprint202101,
  taskGroupId: taskGroupId_ImplementAPI,
  workTimeSec: 60 * 60 * 2.5,
  scheduledTimeSec: 60 * 60 * 3,
  subtasksOrder: [
    // TODO
  ],
  createdAt: new Date('2021-01-01T18:00:20Z').valueOf(),
};

export const taskId_queryTaskGroup = v4();
export const task_queryTaskGroup = {
  id: taskId_queryTaskGroup,
  title: 'Query TaskGroup',
  description: 'Query TaskGroupの実装',
  status: 'TODO',
  assignUserId: userId_ShuuheiHanashiro,
  boardId: boardId_Sprint202101,
  taskGroupId: taskGroupId_ImplementAPI,
  workTimeSec: 0,
  scheduledTimeSec: undefined,
  subtasksOrder: [
    // TODO
  ],
  createdAt: new Date('2021-01-01T18:00:25Z').valueOf(),
};

export const taskId_mutationUpdateTask = v4();
export const task_mutationUpdateTask = {
  id: taskId_mutationUpdateTask,
  title: 'Mutation UpdateTask',
  description: 'Mutation UpdateTaskの実装',
  status: 'DONE',
  assignUserId: userId_KeitaSakai,
  boardId: boardId_Sprint202101,
  taskGroupId: taskGroupId_ImplementAPI,
  workTimeSec: 60 * 60 * 2.5,
  scheduledTimeSec: 60 * 60 * 3,
  subtasksOrder: [
    // TODO
  ],
  createdAt: new Date('2021-01-01T18:00:30Z').valueOf(),
};

export const taskId_mutationDeleteTask = v4();
export const task_mutationDeleteTask = {
  id: taskId_mutationDeleteTask,
  title: 'Mutation DeleteTask',
  description: 'Mutation DeleteTaskの実装',
  status: 'INPROGRESS',
  assignUserId: userId_KeitaSakai,
  boardId: boardId_Sprint202101,
  taskGroupId: taskGroupId_ImplementAPI,
  workTimeSec: 0,
  scheduledTimeSec: 60 * 60 * 2,
  subtasksOrder: [
    // TODO
  ],
  createdAt: new Date('2021-01-01T18:00:40Z').valueOf(),
};

export const taskId_mutationUpdateSubtask = v4();
export const task_mutationUpdateSubtask = {
  id: taskId_mutationUpdateSubtask,
  title: 'Mutation UpdateSubtask',
  description: 'Mutation UpdateSubtaskの実装',
  status: 'TODO',
  assignUserId: userId_KeitaSakai,
  boardId: boardId_Sprint202101,
  taskGroupId: taskGroupId_ImplementAPI,
  workTimeSec: 0,
  subtasksOrder: [
    // TODO
  ],
  createdAt: new Date('2021-01-01T18:00:50Z').valueOf(),
};

export const taskId_mutationDeleteSubtask = v4();
export const task_mutationDeleteSubtask = {
  id: taskId_mutationDeleteSubtask,
  title: 'Mutation DeleteSubtask',
  description: 'Mutation DeleteSubtaskの実装',
  status: 'TODO',
  assignUserId: undefined,
  boardId: boardId_Sprint202101,
  taskGroupId: taskGroupId_ImplementAPI,
  workTimeSec: 0,
  subtasksOrder: [
    // TODO
  ],
  createdAt: new Date('2021-01-01T18:00:55Z').valueOf(),
};

export const taskId_taskCardComponent = v4();
export const task_taskCardComponent = {
  id: taskId_taskCardComponent,
  title: 'タスクカードコンポーネント',
  description: 'タスクカードコンポーネントの実装',
  status: 'CONFIRM',
  assignUserId: userId_ShuuheiHanashiro,
  boardId: boardId_Sprint202101,
  taskGroupId: taskGroupId_ImplementUI,
  workTimeSec: 60 * 60 * 2,
  scheduledTimeSec: undefined,
  subtasksOrder: [
    // TODO
  ],
  createdAt: new Date('2021-01-01T18:10:00Z').valueOf(),
};

export const taskId_subtaskCardComponent = v4();
export const task_subtaskCardComponent = {
  id: taskId_subtaskCardComponent,
  title: 'サブタスクカードコンポーネント',
  description: 'サブタスクカードコンポーネントの実装',
  status: 'DONE',
  assignUserId: userId_ShuuheiHanashiro,
  boardId: boardId_Sprint202101,
  taskGroupId: taskGroupId_ImplementUI,
  workTimeSec: 60 * 60 * 4.75,
  scheduledTimeSec: 60 * 60 * 3.5,
  subtasksOrder: [
    // TODO
  ],
  createdAt: new Date('2021-01-01T18:10:10Z').valueOf(),
};

export const taskId_boardDetailPage = v4();
export const task_boardDetailPage = {
  id: taskId_boardDetailPage,
  title: 'ボード詳細画面',
  description: 'ボード詳細画面の実装',
  status: 'INPROGRESS',
  assignUserId: userId_NaokiOota,
  boardId: boardId_Sprint202101,
  taskGroupId: taskGroupId_ImplementUI,
  workTimeSec: 60 * 60 * 3.5,
  scheduledTimeSec: 60 * 60 * 5,
  subtasksOrder: [
    // TODO
  ],
  createdAt: new Date('2021-01-01T18:10:30Z').valueOf(),
};

export const taskId_projectDetailPage = v4();
export const task_projectDetailPage = {
  id: taskId_projectDetailPage,
  title: 'プロジェクト詳細画面',
  description: 'プロジェクト詳細画面の実装',
  status: 'INPROGRESS',
  assignUserId: userId_KentaToshima,
  boardId: boardId_Sprint202101,
  taskGroupId: taskGroupId_ImplementUI,
  workTimeSec: 60 * 60 * 4.25,
  scheduledTimeSec: 60 * 60 * 6,
  subtasksOrder: [
    // TODO
  ],
  createdAt: new Date('2021-01-01T18:10:50Z').valueOf(),
};

export const taskId_signInPage = v4();
export const task_signInPage = {
  id: taskId_signInPage,
  title: 'サインイン詳細画面',
  description: 'サインイン詳細画面の実装',
  status: 'TODO',
  assignUserId: undefined,
  boardId: boardId_Sprint202101,
  taskGroupId: taskGroupId_ImplementUI,
  workTimeSec: 0,
  scheduledTimeSec: undefined,
  subtasksOrder: [
    // TODO
  ],
  createdAt: new Date('2021-01-01T18:11:20Z').valueOf(),
};

export const taskId_constructInfra = v4();
export const task_constructInfra = {
  id: taskId_constructInfra,
  title: 'AWS環境構築',
  description: '',
  status: 'TODO',
  assignUserId: undefined,
  boardId: boardId_Sprint202101,
  taskGroupId: undefined,
  workTimeSec: 0,
  scheduledTimeSec: undefined,
  subtasksOrder: [
    // TODO
  ],
  createdAt: new Date('2021-01-01T18:12:30Z').valueOf(),
};

export const taskId_constructCIEnv = v4();
export const task_constructCIEnv = {
  id: taskId_constructCIEnv,
  title: 'CI環境の構築',
  description:
    'RemoteRepositoryのPushをトリガーにテストを自動実行できるようにする。',
  status: 'TODO',
  assignUserId: undefined,
  boardId: boardId_Sprint202101,
  taskGroupId: undefined,
  workTimeSec: 0,
  scheduledTimeSec: undefined,
  subtasksOrder: [
    // TODO
  ],
  createdAt: new Date('2021-01-01T18:12:30Z').valueOf(),
};
