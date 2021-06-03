import type {
  IGetTaskByIdService,
  IGetUserByIdService,
} from '@bison/backend/application';
import {
  GET_TASK_BY_ID_SERVICE,
  GET_USER_BY_ID_SERVICE,
} from '@bison/backend/application';
import { Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { convertToResolvedTaskFromDomainTask } from '../../util/convert-to-resolved-task-from-domain-task';
import type {
  ResolvedSubtask,
  ResolvedTask,
  ResolvedUser,
} from '../resolved-value-type';

@Resolver('Subtask')
export class SubtaskResolver {
  constructor(
    @Inject(GET_TASK_BY_ID_SERVICE)
    private getTaskByIdService: IGetTaskByIdService,
    @Inject(GET_USER_BY_ID_SERVICE)
    private getUserByIdService: IGetUserByIdService
  ) {}

  @ResolveField()
  async task(@Parent() subtask: ResolvedSubtask): Promise<ResolvedTask> {
    const task = await this.getTaskByIdService.handle(subtask.task.id);
    return convertToResolvedTaskFromDomainTask(task);
  }

  @ResolveField()
  async assign(
    @Parent() subtask: ResolvedSubtask
  ): Promise<ResolvedUser | undefined> {
    return subtask.assign && this.getUserByIdService.handle(subtask.assign?.id);
  }
}
