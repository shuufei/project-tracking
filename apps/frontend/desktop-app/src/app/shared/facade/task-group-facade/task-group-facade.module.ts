import { NgModule } from '@angular/core';
import {
  UpdateTaskGroupUsecase,
  UPDATE_TASK_GROUP_USECASE,
} from '@bison/frontend/application';
import { TaskGroupFacadeService } from './task-group-facade.service';

@NgModule({
  providers: [
    TaskGroupFacadeService,
    {
      provide: UPDATE_TASK_GROUP_USECASE,
      useClass: UpdateTaskGroupUsecase,
    },
  ],
})
export class TaskGroupFacadeModule {}
