import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  DeleteProjectUsecase,
  DELETE_PROJECT_USECASE,
} from '@bison/frontend/application';
import {
  ButtonModule,
  ColorIconModule,
  DialogModule,
  IconModule,
  SheetFooterModule,
} from '@bison/frontend/ui';
import { TuiNotificationsModule } from '@taiga-ui/core';
import { ProjectDeleteDialogComponent } from './project-delete-dialog.component';

@NgModule({
  declarations: [ProjectDeleteDialogComponent],
  imports: [
    CommonModule,
    DialogModule,
    IconModule,
    ButtonModule,
    SheetFooterModule,
    ColorIconModule,
    TuiNotificationsModule,
  ],
  exports: [ProjectDeleteDialogComponent],
  providers: [
    {
      provide: DELETE_PROJECT_USECASE,
      useClass: DeleteProjectUsecase,
    },
  ],
})
export class ProjectDeleteDialogModule {}
