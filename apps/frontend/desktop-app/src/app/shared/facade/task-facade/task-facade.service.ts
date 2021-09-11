import { Inject, Injectable } from '@angular/core';
import {
  CREATE_TASK_ON_TASK_GROUP_USECASE,
  DELETE_TASK_USECASE,
  ICreateTaskOnTaskGroupUsecase,
  IDeleteTaskUsecase,
  IUpdateTaskUsecase,
  UPDATE_TASK_USECASE,
} from '@bison/frontend/application';
import { Task } from '@bison/frontend/domain';
import { Board } from '@bison/frontend/ui';
import {
  CreateTaskOnTaskGroupInput,
  TaskGroup,
  UpdateTaskInput,
  User,
} from '@bison/shared/schema';
import { gql } from 'apollo-angular';
import { of } from 'rxjs';
import { convertToApiStatusFromDomainStatus } from '../../../util/convert-to-api-status-from-domain-status';

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
    private createTaskOnTaskGroupUsecase: ICreateTaskOnTaskGroupUsecase,
    @Inject(UPDATE_TASK_USECASE) private updateTaskUsecase: IUpdateTaskUsecase,
    @Inject(DELETE_TASK_USECASE) private deleteTaskUsecase: IDeleteTaskUsecase
  ) {}

  createOnTaskGroup(
    title: Task['title'],
    description: Task['description'],
    assignUserId: User['id'] | undefined,
    taskGroupId: TaskGroup['id'],
    scheduledTimeSec: TaskGroup['scheduledTimeSec']
  ) {
    const input: CreateTaskOnTaskGroupInput = {
      title,
      description,
      assignUserId,
      taskGroupId,
      scheduledTimeSec,
    };
    return this.createTaskOnTaskGroupUsecase.excute(input, {
      fields: TASK_FIELDS,
      name: 'TaskPartsForCreateTaskOnTaskGroup',
    });
  }

  updateTitle(title: Task['title'], currentTask: Task) {
    const input = this.generateUpdateInputBase(currentTask);
    return this.updateTaskUsecase.execute({
      ...input,
      title,
    });
  }

  updateTitleAndDescription(
    title: Task['title'],
    description: Task['description'],
    currentTask: Task
  ) {
    const input = this.generateUpdateInputBase(currentTask);
    return this.updateTaskUsecase.execute({
      ...input,
      title,
      description,
    });
  }

  updateStatus(status: Task['status'], currentTask: Task) {
    const input = this.generateUpdateInputBase(currentTask);
    return this.updateTaskUsecase.execute({
      ...input,
      status: convertToApiStatusFromDomainStatus(status),
    });
  }

  updateAssignUser(userId: User['id'] | undefined, currentTask: Task) {
    const input = this.generateUpdateInputBase(currentTask);
    return this.updateTaskUsecase.execute({
      ...input,
      assignUserId: userId,
    });
  }

  updateBoard(boardId: Board['id'], currentTask: Task) {
    const input = this.generateUpdateInputBase(currentTask);
    return this.updateTaskUsecase.execute({
      ...input,
      boardId,
    });
  }

  updateSubtasksOrder(subtasksOrder: Task['subtasksOrder'], currentTask: Task) {
    const input = this.generateUpdateInputBase(currentTask);
    return this.updateTaskUsecase.execute({
      ...input,
      subtasksOrder,
    });
  }

  startTracking(now: Date, currentTask: Task) {
    const input = this.generateUpdateInputBase(currentTask);
    return this.updateTaskUsecase.execute({
      ...input,
      workStartDateTimestamp: now.valueOf(),
    });
  }

  stopTracking(now: Date, currentTask: Task) {
    const start = currentTask.workStartDateTimestamp;
    const currentWorkTimeSec = currentTask.workTimeSec;
    if (start == null || currentWorkTimeSec == null) return of(undefined);
    const diffTimeMilliSec = now.valueOf() - start;
    const updatedWorkTimeSec =
      currentWorkTimeSec + Math.ceil(diffTimeMilliSec / 1000);
    const input = this.generateUpdateInputBase(currentTask);
    return this.updateTaskUsecase.execute({
      ...input,
      workTimeSec: updatedWorkTimeSec,
      workStartDateTimestamp: undefined,
    });
  }

  updateWorkTimeSec(
    workTimeSec: Task['workTimeSec'],
    workStartDateTimestamp: Task['workStartDateTimestamp'],
    currentTask: Task
  ) {
    const input = this.generateUpdateInputBase(currentTask);
    return this.updateTaskUsecase.execute({
      ...input,
      workTimeSec,
      workStartDateTimestamp,
    });
  }

  updateScheduledTimeSec(
    scheduledTimeSec: Task['scheduledTimeSec'],
    currentTask: Task
  ) {
    const input = this.generateUpdateInputBase(currentTask);
    return this.updateTaskUsecase.execute({
      ...input,
      scheduledTimeSec,
    });
  }

  delete(id: Task['id']) {
    return this.deleteTaskUsecase.execute({ id });
  }

  private generateUpdateInputBase(task: Task): UpdateTaskInput {
    const input: UpdateTaskInput = {
      id: task.id,
      title: task.title,
      description: task.description,
      status: convertToApiStatusFromDomainStatus(task.status),
      assignUserId: task.assignUser?.id,
      workTimeSec: task.workTimeSec,
      scheduledTimeSec: task.scheduledTimeSec,
      boardId: task.board.id,
      subtasksOrder: task.subtasksOrder,
      taskGroupId: task.taskGroup?.id,
      workStartDateTimestamp: task.workStartDateTimestamp,
    };
    return input;
  }
}
