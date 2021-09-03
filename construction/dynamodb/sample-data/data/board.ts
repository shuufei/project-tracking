import { projectId_Bison } from './project-user';

export const boardId_Sprint202101 = 'board0001';
export const board_Sprint202101 = {
  id: boardId_Sprint202101,
  name: 'Sprint202101',
  description: 'スプリント 2021/01',
  projectId: projectId_Bison,
  tasksOrder: [
    { taskId: 'taskGroup0001', type: 'TaskGroup' },
    { taskId: 'task0014', type: 'Task' },
  ],
  createdAt: new Date('2021-01-01T18:00:10Z').valueOf(),
};

export const boardId_Sprint202105 = 'board0002';
export const board_Sprint202105 = {
  id: boardId_Sprint202105,
  name: 'Sprint202105',
  description: 'スプリント 2021/05',
  projectId: projectId_Bison,
  tasksOrder: [],
  createdAt: new Date('2021-05-01T18:00:10Z').valueOf(),
};

export const boardId_Sprint202109 = 'board0003';
export const board_Sprint202109 = {
  id: boardId_Sprint202109,
  name: 'Sprint202109',
  description: 'スプリント 2021/09',
  projectId: projectId_Bison,
  tasksOrder: [],
  createdAt: new Date('2021-09-01T18:00:10Z').valueOf(),
};

export const boardItems = [
  board_Sprint202101,
  board_Sprint202105,
  board_Sprint202109,
];
