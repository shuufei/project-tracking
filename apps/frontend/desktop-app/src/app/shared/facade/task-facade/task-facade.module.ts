import { NgModule } from '@angular/core';
import {
  CreateTaskOnTaskGroupUsecase,
  CREATE_TASK_ON_TASK_GROUP_USECASE,
} from '@bison/frontend/application';
import { TaskFacadeService } from './task-facade.service';

@NgModule({
  providers: [
    TaskFacadeService,
    {
      provide: CREATE_TASK_ON_TASK_GROUP_USECASE,
      useClass: CreateTaskOnTaskGroupUsecase,
    },
  ],
})
export class TaskFacadeModule {}
