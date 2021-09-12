import { InjectionToken } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Board, Project, UpdateBoardInput } from '@bison/shared/schema';
import { Observable } from 'rxjs';

export interface IUpdateBoardUsecase {
  execute: (
    input: UpdateBoardInput
  ) => Observable<FetchResult<{ updateBoard: UpdateBoardResponse }>>;
}

export const UPDATE_BOARD_USECASE = new InjectionToken<IUpdateBoardUsecase>(
  'UpdateBoardUsecase'
);

export type UpdateBoardResponse = Pick<
  Board,
  'id' | 'name' | 'description' | 'tasksOrder'
> & {
  __typename: 'Board';
  project: Pick<Project, 'id'> & {
    __typename: 'Project';
  };
};
