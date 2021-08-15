import { Inject, Injectable } from '@angular/core';
import {
  DELETE_TASK_GROUP_USECASE,
  IDeleteTaskGroupUsecase,
  IUpdateTaskGroupUsecase,
  UPDATE_TASK_GROUP_USECASE,
} from '@bison/frontend/application';
import { TaskGroup } from '@bison/frontend/domain';
import { Board } from '@bison/shared/domain';
import { UpdateTaskGroupInput, User } from '@bison/shared/schema';
import { convertToApiStatusFromDomainStatus } from '../../../util/convert-to-api-status-from-domain-status';

@Injectable()
export class TaskGroupFacadeService {
  constructor(
    @Inject(UPDATE_TASK_GROUP_USECASE)
    private readonly updateTaskGroupUsecase: IUpdateTaskGroupUsecase,
    @Inject(DELETE_TASK_GROUP_USECASE)
    private readonly deleteTaskGroupUsecase: IDeleteTaskGroupUsecase
  ) {}

  updateStatus(status: TaskGroup['status'], currentTaskGroup: TaskGroup) {
    const input = this.generateUpdateInputBase(currentTaskGroup);
    return this.updateTaskGroupUsecase.execute({
      ...input,
      status: convertToApiStatusFromDomainStatus(status),
    });
  }

  updateAssignUser(
    userId: User['id'] | undefined,
    currentTaskGroup: TaskGroup
  ) {
    const input = this.generateUpdateInputBase(currentTaskGroup);
    return this.updateTaskGroupUsecase.execute({
      ...input,
      assignUserId: userId,
    });
  }

  updateBoard(boardId: Board['id'], currentTaskGroup: TaskGroup) {
    const input = this.generateUpdateInputBase(currentTaskGroup);
    return this.updateTaskGroupUsecase.execute({
      ...input,
      boardId,
    });
  }

  updateTitleAndDescription(
    title: TaskGroup['title'],
    description: TaskGroup['description'],
    currentTaskGroup: TaskGroup
  ) {
    const input = this.generateUpdateInputBase(currentTaskGroup);
    return this.updateTaskGroupUsecase.execute({
      ...input,
      title,
      description,
    });
  }

  updateTasksOrder(
    tasksOrder: TaskGroup['tasksOrder'],
    currentTaskGroup: TaskGroup
  ) {
    const input = this.generateUpdateInputBase(currentTaskGroup);
    return this.updateTaskGroupUsecase.execute({
      ...input,
      tasksOrder,
    });
  }

  updateScheduledTimeSec(
    scheduledTimeSec: TaskGroup['scheduledTimeSec'],
    currentTaskGroup: TaskGroup
  ) {
    const input = this.generateUpdateInputBase(currentTaskGroup);
    return this.updateTaskGroupUsecase.execute({
      ...input,
      scheduledTimeSec,
    });
  }

  delete(id: TaskGroup['id']) {
    return this.deleteTaskGroupUsecase.execute({ id });
  }

  private generateUpdateInputBase(taskGroup: TaskGroup) {
    const input: UpdateTaskGroupInput = {
      id: taskGroup.id,
      title: taskGroup.title,
      description: taskGroup.description,
      status: convertToApiStatusFromDomainStatus(taskGroup.status),
      assignUserId: taskGroup.assignUser?.id,
      scheduledTimeSec: taskGroup.scheduledTimeSec,
      boardId: taskGroup.board.id,
      tasksOrder: taskGroup.tasksOrder,
    };
    return input;
  }
}
