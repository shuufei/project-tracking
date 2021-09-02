import { userId_KeitaSakai, userId_NaokiOota } from './project-user';
import { taskId_boardDetailPage, taskId_constructCIEnv } from './task';

export const subtaskId_boardDetailPageComponent = 'subtask0001';
export const subtask_boardDetailPageComponent = {
  id: subtaskId_boardDetailPageComponent,
  title: 'コンポーネント実装',
  description: 'ボード詳細画面で利用するコンポーネントの実装',
  isDone: true,
  taskId: taskId_boardDetailPage,
  workTimeSec: 60 * 60 * 1,
  scheduledTimeSec: 60 * 60 * 2.5,
  assignUserId: userId_NaokiOota,
  createdAt: new Date('2021-01-02T18:00:10Z').valueOf(),
};

export const subtaskId_boardDetailPageUsecase = 'subtask0002';
export const subtask_boardDetailPageUsecase = {
  id: subtaskId_boardDetailPageUsecase,
  title: 'Usecase実装',
  description: 'ボード詳細画面で利用するUsecaseの実装',
  isDone: true,
  taskId: taskId_boardDetailPage,
  workTimeSec: 60 * 60 * 2,
  scheduledTimeSec: 60 * 60 * 2,
  assignUserId: userId_NaokiOota,
  createdAt: new Date('2021-01-02T18:00:20Z').valueOf(),
};

export const subtaskId_pageComponent = 'subtask0003';
export const subtask_pageComponent = {
  id: subtaskId_pageComponent,
  title: 'ページコンポーネント実装',
  description: 'ページコンポーネント実装',
  isDone: false,
  taskId: taskId_boardDetailPage,
  workTimeSec: 60 * 60 * 0,
  scheduledTimeSec: undefined,
  createdAt: new Date('2021-01-02T18:00:30Z').valueOf(),
};

export const subtaskId_implementCISpec = 'subtask0004';
export const subtask_implementCISpec = {
  id: subtaskId_implementCISpec,
  title: 'buildspecファイルの作成',
  description: 'buildspecファイルの作成。',
  isDone: true,
  taskId: taskId_constructCIEnv,
  workTimeSec: 60 * 60 * 3,
  scheduledTimeSec: 60 * 60 * 2.5,
  assignUserId: userId_KeitaSakai,
  createdAt: new Date('2021-01-02T18:10:30Z').valueOf(),
};

export const subtaskId_constructCIEnv = 'subtask0005';
export const subtask_constructCIEnv = {
  id: subtaskId_constructCIEnv,
  title: '環境構築',
  description: 'AWSにCI環境を構築する',
  isDone: false,
  taskId: taskId_constructCIEnv,
  workTimeSec: 0,
  scheduledTimeSec: 60 * 60 * 4,
  createdAt: new Date('2021-01-02T18:11:30Z').valueOf(),
};

export const subtaskItems = [
  subtask_boardDetailPageComponent,
  subtask_boardDetailPageUsecase,
  subtask_pageComponent,
  subtask_implementCISpec,
  subtask_constructCIEnv,
];
