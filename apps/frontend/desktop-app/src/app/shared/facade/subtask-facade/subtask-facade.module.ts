import { NgModule } from '@angular/core';
import {
  ApolloDataQuery,
  APOLLO_DATA_QUERY,
  CreateSubtaskUsecase,
  CREATE_SUBTASK_USECASE,
  DeleteSubtaskUsecase,
  DELETE_SUBTASK_USECASE,
  UpdateSubtaskUsecase,
  UPDATE_SUBTASK_USECASE,
} from '@bison/frontend/application';
import { SubtaskFacadeService } from './subtask-facade.service';

@NgModule({
  providers: [
    SubtaskFacadeService,
    {
      provide: APOLLO_DATA_QUERY,
      useClass: ApolloDataQuery,
    },
    {
      provide: UPDATE_SUBTASK_USECASE,
      useClass: UpdateSubtaskUsecase,
    },
    {
      provide: DELETE_SUBTASK_USECASE,
      useClass: DeleteSubtaskUsecase,
    },
    {
      provide: CREATE_SUBTASK_USECASE,
      useClass: CreateSubtaskUsecase,
    },
  ],
})
export class SubtaskFacadeModule {}
