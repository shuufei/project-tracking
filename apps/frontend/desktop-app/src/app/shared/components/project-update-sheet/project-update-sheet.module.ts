import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  UpdateProjectUsecase,
  UPDATE_PROJECT_USECASE,
} from '@bison/frontend/application';
import {
  ButtonModule,
  MultiUserSelectPopupModule,
  SheetFooterModule,
  SheetModule,
} from '@bison/frontend/ui';
import { TuiNotificationsModule } from '@taiga-ui/core';
import { ProjectPropertyEditFormModule } from '../project-property-edit-form/project-property-edit-form.module';
import { ProjectUpdateSheetComponent } from './project-update-sheet.component';

@NgModule({
  declarations: [ProjectUpdateSheetComponent],
  imports: [
    CommonModule,
    SheetModule,
    ButtonModule,
    MultiUserSelectPopupModule,
    SheetFooterModule,
    ProjectPropertyEditFormModule,
    TuiNotificationsModule,
  ],
  providers: [
    {
      provide: UPDATE_PROJECT_USECASE,
      useClass: UpdateProjectUsecase,
    },
  ],
  exports: [ProjectUpdateSheetComponent],
})
export class ProjectUpdateSheetModule {}
