import { NgModule } from '@angular/core';
import {
  CreateTaskOnTaskGroupUsecase,
  CREATE_TASK_ON_TASK_GROUP_USECASE,
  DeleteTaskUsecase,
  DELETE_TASK_USECASE,
  UpdateTaskUsecase,
  UPDATE_TASK_USECASE,
} from '@bison/frontend/application';
import { TaskFacadeService } from './task-facade.service';

@NgModule({
  providers: [
    TaskFacadeService,
    {
      provide: CREATE_TASK_ON_TASK_GROUP_USECASE,
      useClass: CreateTaskOnTaskGroupUsecase,
    },
    {
      provide: UPDATE_TASK_USECASE,
      useClass: UpdateTaskUsecase,
    },
    {
      provide: DELETE_TASK_USECASE,
      useClass: DeleteTaskUsecase,
    },
  ],
})
export class TaskFacadeModule {}
