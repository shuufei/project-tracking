import { InjectionToken } from '@angular/core';
import { FetchResult } from '@apollo/client';
import {
  CreateTaskOnTaskGroupInput,
  Task,
  TaskGroup,
  User,
} from '@bison/shared/schema';
import { Observable } from 'rxjs';
import { Fragment } from '../../../types';

export interface ICreateTaskOnTaskGroupUsecase {
  excute: (
    input: CreateTaskOnTaskGroupInput,
    fragment: Fragment
  ) => Observable<
    FetchResult<{ createTaskOnTaskGroup: CreateTaskOnTaskGroupResponse }>
  >;
}

export const CREATE_TASK_ON_TASK_GROUP_USECASE = new InjectionToken<ICreateTaskOnTaskGroupUsecase>(
  'CreateTaskUsecaseOnTaskGroup'
);

export type CreateTaskOnTaskGroupResponse = Pick<
  Task,
  | 'id'
  | 'title'
  | 'description'
  | 'scheduledTimeSec'
  | 'status'
  | 'subtasks'
  | 'workTimeSec'
  | 'workStartDateTimestamp'
  | 'subtasksOrder'
  | 'createdAt'
> & {
  __typename: 'Task';
  assign?: Pick<User, 'id'> & { __typename: 'User' };
  taskGroup: Pick<TaskGroup, 'id'> & { __typename: 'TaskGroup' };
};
