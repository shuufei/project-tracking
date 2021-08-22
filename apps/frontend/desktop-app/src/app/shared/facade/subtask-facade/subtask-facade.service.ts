import { Inject, Injectable } from '@angular/core';
import {
  APOLLO_DATA_QUERY,
  CREATE_SUBTASK_USECASE,
  DELETE_SUBTASK_USECASE,
  IApolloDataQuery,
  ICreateSubtaskUsecase,
  IDeleteSubtaskUsecase,
  IUpdateSubtaskUsecase,
  UPDATE_SUBTASK_USECASE,
} from '@bison/frontend/application';
import { Subtask } from '@bison/frontend/domain';
import {
  CreateSubtaskInput,
  DeleteSubtaskInput,
  UpdateSubtaskInput,
  User,
} from '@bison/shared/schema';
import { gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { convertToDomainSubtaskFromApiSubtask } from '../../../util/convert-to-domain-subtask-from-api-subtask';

const SUBTASK_FIELDS = gql`
  fragment SubtaskPartsForCreateSubtask on Subtask {
    id
    title
    description
    isDone
    task {
      id
    }
    scheduledTimeSec
    workTimeSec
    assign {
      id
      name
      icon
    }
  }
`;

@Injectable()
export class SubtaskFacadeService {
  constructor(
    @Inject(APOLLO_DATA_QUERY) private apolloDataQuery: IApolloDataQuery,
    @Inject(CREATE_SUBTASK_USECASE)
    private createSubtaskUsecase: ICreateSubtaskUsecase,
    @Inject(UPDATE_SUBTASK_USECASE)
    private updateSubtaskUsecase: IUpdateSubtaskUsecase,
    @Inject(DELETE_SUBTASK_USECASE)
    private deleteSubtaskUsecase: IDeleteSubtaskUsecase
  ) {}

  create(
    title: Subtask['title'],
    taskId: Subtask['taskId']
  ): Observable<Subtask> {
    const input: CreateSubtaskInput = {
      title,
      taskId: taskId,
    };
    return this.createSubtaskUsecase
      .execute(input, {
        fields: SUBTASK_FIELDS,
        name: 'SubtaskPartsForCreateSubtask',
      })
      .pipe(
        map((response) => response.data?.createSubtask),
        filter((v): v is NonNullable<typeof v> => v != null),
        map((subtask) => {
          return convertToDomainSubtaskFromApiSubtask(subtask);
        })
      );
  }

  updateAssignUser(userId: User['id'] | undefined, currentSubtask: Subtask) {
    const input = this.generateUpdateInputBase(currentSubtask);
    return this.updateSubtaskUsecase.execute({
      ...input,
      assignUserId: userId,
    });
  }

  updateIsDoone(isDone: Subtask['isDone'], currentSubtask: Subtask) {
    const input = this.generateUpdateInputBase(currentSubtask);
    return this.updateSubtaskUsecase.execute({
      ...input,
      isDone,
    });
  }

  updateWorkTimeSec(
    workTimeSec: Subtask['workTimeSec'],
    workStartDateTimestamp: Subtask['workStartDateTimestamp'],
    currentSubtask: Subtask
  ) {
    const input = this.generateUpdateInputBase(currentSubtask);
    return this.updateSubtaskUsecase.execute({
      ...input,
      workTimeSec,
      workStartDateTimestamp,
    });
  }

  updateScheduledTimeSec(
    scheduledTimeSec: Subtask['scheduledTimeSec'],
    currentSubtask: Subtask
  ) {
    const input = this.generateUpdateInputBase(currentSubtask);
    return this.updateSubtaskUsecase.execute({
      ...input,
      scheduledTimeSec,
    });
  }

  startTracking(now: Date, currentSubtask: Subtask) {
    const input = this.generateUpdateInputBase(currentSubtask);
    return this.updateSubtaskUsecase.execute({
      ...input,
      workStartDateTimestamp: now.valueOf(),
    });
  }

  stopTracking(updatedSubtask: Subtask) {
    const input = this.generateUpdateInputBase(updatedSubtask);
    return this.updateSubtaskUsecase.execute({
      ...input,
    });
  }

  updateTitle(title: Subtask['title'], currentSubtask: Subtask) {
    const input = this.generateUpdateInputBase(currentSubtask);
    return this.updateSubtaskUsecase.execute({
      ...input,
      title,
    });
  }

  updateTitleAndDescription(
    title: Subtask['title'],
    description: Subtask['description'],
    currentSubtask: Subtask
  ) {
    const input = this.generateUpdateInputBase(currentSubtask);
    return this.updateSubtaskUsecase.execute({
      ...input,
      title,
      description,
    });
  }

  delete(id: Subtask['id']) {
    const input: DeleteSubtaskInput = {
      id,
    };
    return this.deleteSubtaskUsecase.execute(input);
  }

  private generateUpdateInputBase(subtask: Subtask) {
    const input: UpdateSubtaskInput = {
      id: subtask.id,
      title: subtask.title,
      description: subtask.description,
      isDone: subtask.isDone,
      assignUserId: subtask.assignUser?.id,
      workTimeSec: subtask.workTimeSec,
      scheduledTimeSec: subtask.scheduledTimeSec,
      workStartDateTimestamp: subtask.workStartDateTimestamp,
      taskId: subtask.taskId,
    };
    return input;
  }
}
