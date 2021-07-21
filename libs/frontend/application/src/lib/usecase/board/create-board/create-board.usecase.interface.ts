import { InjectionToken } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Board, CreateBoardInput } from '@bison/shared/schema';
import { Observable } from 'rxjs';

export interface ICreateBoardUsecase {
  execute: (
    input: CreateBoardInput
  ) => Observable<FetchResult<{ createBoard: Board }>>;
}

export const CREATE_BOARD_USECASE = new InjectionToken<ICreateBoardUsecase>(
  'CreateBoardUsecase'
);
