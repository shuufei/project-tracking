import { InjectionToken } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Board, DeleteBoardInput } from '@bison/shared/schema';
import { Observable } from 'rxjs';

export interface IDeleteBoardUsecase {
  execute: (
    input: DeleteBoardInput
  ) => Observable<FetchResult<{ deleteBoard: Board }>>;
}

export const DELETE_BOARD_USECASE = new InjectionToken<IDeleteBoardUsecase>(
  'DeleteBoardUsecase'
);
