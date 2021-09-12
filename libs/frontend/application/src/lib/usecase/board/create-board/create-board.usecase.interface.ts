import { InjectionToken } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Board, CreateBoardInput, Project } from '@bison/shared/schema';
import { Observable } from 'rxjs';

export interface ICreateBoardUsecase {
  execute: (
    input: CreateBoardInput
  ) => Observable<FetchResult<{ createBoard: CreateBoardResponse }>>;
}

export const CREATE_BOARD_USECASE = new InjectionToken<ICreateBoardUsecase>(
  'CreateBoardUsecase'
);

export type CreateBoardResponse = Pick<
  Board,
  'id' | 'name' | 'tasksOrder' | 'createdAt'
> & {
  description: Board['description'] | null;
  __typename: 'Board';
  project: Pick<Project, 'id'> & { __typename: 'Project' };
};
