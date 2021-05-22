import type {
  IGetBoardByIdAndUserService,
  IGetProjectByBoardIdService,
  IListTaskGroupsByBoardIdService,
} from '@bison/backend/application';
import {
  GET_BOARD_BY_ID_AND_USER_SERVICE,
  GET_PROJECT_BY_BOARD_ID_SERVICE,
  LIST_TASK_GROUPS_BY_BOARD_ID_SERVICE,
} from '@bison/backend/application';
import type { Id, User } from '@bison/shared/domain';
import type { Board, Project, TaskGroup } from '@bison/shared/schema';
import { Inject } from '@nestjs/common';
import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { IdpUserId } from '../../decorators/idp-user-id.decorator';
import { ParseUserPipe } from '../../pipes/parse-user/parse-user.pipe';
import { convertToApiColorFromDomainColor } from '../../util/convert-to-color-from-domain-color';
import { convertToApiStatusFromDomainStatus } from '../../util/convert-to-status-from-domain-status';

@Resolver('Board')
export class BoardResolver {
  constructor(
    @Inject(GET_PROJECT_BY_BOARD_ID_SERVICE)
    private getProjectByBoardIdService: IGetProjectByBoardIdService,
    @Inject(GET_BOARD_BY_ID_AND_USER_SERVICE)
    private getBoardByIdService: IGetBoardByIdAndUserService,
    @Inject(LIST_TASK_GROUPS_BY_BOARD_ID_SERVICE)
    private listTaskGroupsByBoardIdService: IListTaskGroupsByBoardIdService
  ) {}

  @Query()
  async board(
    @IdpUserId(ParseUserPipe) user: User,
    @Args('id', { type: () => ID }) id: Id
  ): Promise<
    Omit<Board, 'project' | 'singleTasks' | 'taskGroups' | 'tasksOrder'>
  > {
    const board = await this.getBoardByIdService.handle(id, user);
    return {
      id: board.id,
      name: board.name,
      description: board.description,
    };
  }

  @ResolveField()
  async project(
    @Parent() board: Omit<Board, 'project'>
  ): Promise<Omit<Project, 'boards' | 'members' | 'admin'>> {
    const project = await this.getProjectByBoardIdService.handle(board.id);
    return {
      ...project,
      color: convertToApiColorFromDomainColor(project.color),
    };
  }

  @ResolveField()
  async taskGroups(
    @Parent() board: Omit<Board, 'project'>
  ): Promise<Omit<TaskGroup, 'tasks' | 'assign' | 'project' | 'board'>[]> {
    const { taskGroups } = await this.listTaskGroupsByBoardIdService.handle(
      board.id
    );
    return taskGroups.map((taskGroup) => ({
      id: taskGroup.id,
      title: taskGroup.title,
      description: taskGroup.description,
      status: convertToApiStatusFromDomainStatus(taskGroup.status),
      scheduledTimeSec: taskGroup.scheduledTimeSec,
      tasksOrder: [],
    }));
  }
}
