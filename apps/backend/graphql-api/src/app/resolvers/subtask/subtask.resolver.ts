import type {
  ICreateSubtaskService,
  IDeleteSubtaskService,
  IGetTaskByIdService,
  IGetUserByIdService,
  IUpdateSubtaskService,
} from '@bison/backend/application';
import {
  CREATE_SUBTASK_SERVICE,
  DELETE_SUBTASK_SERVICE,
  GET_TASK_BY_ID_SERVICE,
  GET_USER_BY_ID_SERVICE,
  UPDATE_SUBTASK_SERVICE,
} from '@bison/backend/application';
import type { User } from '@bison/shared/domain';
import type {
  CreateSubtaskInput,
  UpdateSubtaskInput,
} from '@bison/shared/schema';
import { Inject } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { IdpUserId } from '../../decorators/idp-user-id.decorator';
import { ParseUserPipe } from '../../pipes/parse-user/parse-user.pipe';
import { convertToResolvedSubtaskFromDomainSubtask } from '../../util/convert-to-resolved-subtask-from-domain-subtask';
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
    private getUserByIdService: IGetUserByIdService,
    @Inject(CREATE_SUBTASK_SERVICE)
    private createSubtaskService: ICreateSubtaskService,
    @Inject(UPDATE_SUBTASK_SERVICE)
    private updateSubtaskService: IUpdateSubtaskService,
    @Inject(DELETE_SUBTASK_SERVICE)
    private deleteSubtaskService: IDeleteSubtaskService
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

  @Mutation()
  async createSubtask(
    @Args('input') input: CreateSubtaskInput,
    @IdpUserId(ParseUserPipe) user: User
  ): Promise<ResolvedSubtask> {
    const subtask = await this.createSubtaskService.handle(input, user);
    return convertToResolvedSubtaskFromDomainSubtask(subtask);
  }

  @Mutation()
  async updateSubtask(
    @Args('input') input: UpdateSubtaskInput,
    @IdpUserId(ParseUserPipe) user: User
  ): Promise<ResolvedSubtask> {
    const subtask = await this.updateSubtaskService.handle(
      {
        ...input,
        isDone: input.isCompleted,
        workTimeSec: input.workTime,
      },
      user
    );
    return convertToResolvedSubtaskFromDomainSubtask(subtask);
  }

  @Mutation()
  async deleteSubtask(
    @Args('input') input: UpdateSubtaskInput,
    @IdpUserId(ParseUserPipe) user: User
  ): Promise<ResolvedSubtask> {
    const subtask = await this.deleteSubtaskService.handle(input.id, user);
    return convertToResolvedSubtaskFromDomainSubtask(subtask);
  }
}
