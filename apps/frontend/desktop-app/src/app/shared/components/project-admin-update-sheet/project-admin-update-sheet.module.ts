import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ApolloDataQuery,
  APOLLO_DATA_QUERY,
  UpdateProjectUsecase,
  UPDATE_PROJECT_USECASE,
} from '@bison/frontend/application';
import {
  ButtonModule,
  IconModule,
  SheetFooterModule,
  SheetModule,
  UserIconModule,
  UserSelectPopupModule,
} from '@bison/frontend/ui';
import { TuiNotificationsModule } from '@taiga-ui/core';
import { ProjectAdminUpdateSheetComponent } from './project-admin-update-sheet.component';

@NgModule({
  declarations: [ProjectAdminUpdateSheetComponent],
  imports: [
    CommonModule,
    SheetModule,
    UserSelectPopupModule,
    UserIconModule,
    SheetFooterModule,
    ButtonModule,
    IconModule,
    TuiNotificationsModule,
  ],
  exports: [ProjectAdminUpdateSheetComponent],
  providers: [
    {
      provide: APOLLO_DATA_QUERY,
      useClass: ApolloDataQuery,
    },
    {
      provide: UPDATE_PROJECT_USECASE,
      useClass: UpdateProjectUsecase,
    },
  ],
})
export class ProjectAdminUpdateSheetModule {}
