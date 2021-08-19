import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ApolloDataQuery,
  APOLLO_DATA_QUERY,
  UpdateProjectMembersUsecase,
  UPDATE_PROJECT_MEMBERS_USECASE,
} from '@bison/frontend/application';
import {
  ButtonModule,
  MultiUserSelectPopupModule,
  SheetFooterModule,
  SheetModule,
  UserIconModule,
} from '@bison/frontend/ui';
import { TuiNotificationsModule } from '@taiga-ui/core';
import { ProjectMemberUpdateSheetComponent } from './project-member-update-sheet.component';

@NgModule({
  declarations: [ProjectMemberUpdateSheetComponent],
  imports: [
    CommonModule,
    SheetModule,
    ButtonModule,
    MultiUserSelectPopupModule,
    UserIconModule,
    SheetFooterModule,
    TuiNotificationsModule,
  ],
  providers: [
    {
      provide: UPDATE_PROJECT_MEMBERS_USECASE,
      useClass: UpdateProjectMembersUsecase,
    },
    {
      provide: APOLLO_DATA_QUERY,
      useClass: ApolloDataQuery,
    },
  ],
  exports: [ProjectMemberUpdateSheetComponent],
})
export class ProjectMemberUpdateSheetModule {}
