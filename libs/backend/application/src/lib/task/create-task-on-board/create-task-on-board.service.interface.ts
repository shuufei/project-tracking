import { Task, User } from '@bison/shared/domain';

export interface ICreateTaskOnBoardService {
  handle: (
    input: CreateTaskOnBoardServiceInput,
    requestUser: User
  ) => Promise<Task>;
}

export const CREATE_TASK_ON_BOARD_SERVICE = Symbol('CreateTaskOnBoardService');

export type CreateTaskOnBoardServiceInput = Pick<
  Task,
  'title' | 'description' | 'assignUserId' | 'boardId'
>;
