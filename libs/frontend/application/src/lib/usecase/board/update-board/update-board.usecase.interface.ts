import { InjectionToken } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Board, UpdateBoardInput } from '@bison/shared/schema';
import { Observable } from 'rxjs';

export interface IUpdateBoardUsecase {
  execute: (
    input: UpdateBoardInput
  ) => Observable<FetchResult<{ upateBoard: Board }>>;
}

export const UPDATE_BOARD_USECASE = new InjectionToken<IUpdateBoardUsecase>(
  'UpdateBoardUsecase'
);
