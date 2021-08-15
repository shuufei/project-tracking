import { Inject, Injectable } from '@angular/core';
import {
  CREATE_TASK_ON_TASK_GROUP_USECASE,
  ICreateTaskOnTaskGroupUsecase,
} from '@bison/frontend/application';
import { Task as DomainTask } from '@bison/frontend/domain';
import {
  CreateTaskOnTaskGroupInput,
  Task,
  TaskGroup,
  User,
} from '@bison/shared/schema';
import { gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { convertToDomainTaskFromApiTask } from '../../../util/convert-to-domain-task-from-api-task';

const TASK_FIELDS = gql`
  fragment TaskPartsForCreateTaskOnTaskGroup on Task {
    id
    title
    description
    status
    workTimeSec
    scheduledTimeSec
    subtasksOrder
    workStartDateTimestamp
    board {
      id
      name
      description
      project {
        id
        name
      }
    }
    assign {
      id
      name
      icon
    }
    taskGroup {
      id
      title
      description
    }
    subtasks {
      id
      title
      description
      isDone
      scheduledTimeSec
      workTimeSec
      workStartDateTimestamp
      assign {
        id
        name
        icon
      }
    }
  }
`;

@Injectable()
export class TaskFacadeService {
  constructor(
    @Inject(CREATE_TASK_ON_TASK_GROUP_USECASE)
    private createTaskOnTaskGroupUsecase: ICreateTaskOnTaskGroupUsecase
  ) {}

  createOnTaskGroup(
    title: Task['title'],
    description: Task['description'],
    assignUserId: User['id'] | undefined,
    taskGroupId: TaskGroup['id'],
    scheduledTimeSec: TaskGroup['scheduledTimeSec']
  ): Observable<DomainTask> {
    const input: CreateTaskOnTaskGroupInput = {
      title,
      description,
      assignUserId,
      taskGroupId,
      scheduledTimeSec,
    };
    return this.createTaskOnTaskGroupUsecase
      .excute(input, {
        fields: TASK_FIELDS,
        name: 'TaskPartsForCreateTaskOnTaskGroup',
      })
      .pipe(
        map((response) => response.data?.createTaskOnTaskGroup),
        filter((v): v is NonNullable<typeof v> => v != null),
        map((task) => {
          return convertToDomainTaskFromApiTask(task);
        })
      );
  }
}
