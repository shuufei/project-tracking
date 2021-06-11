import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ApolloDataQuery,
  APOLLO_DATA_QUERY
} from '@bison/frontend/application';
import {
  ButtonModule,
  HeaderModule,
  IconModule,
  MenuItemModule,
  MultiUserSelectPopupModule,
  PopupModule,
  ProjectNavigationModule,
  SheetFooterModule,
  SheetModule,
  TaskCardModule,
  UserIconModule
} from '@bison/frontend/ui';
import { TuiNotificationsModule } from '@taiga-ui/core';
import { BoardCreateSheetModule } from '../../shared/components/board-create-sheet/board-create-sheet.module';
import { BoardDeleteDialogModule } from '../../shared/components/board-delete-dialog/board-delete-dialog.module';
import { BoardUpdateSheetModule } from '../../shared/components/board-update-sheet/board-update-sheet.module';
import { ProjectDeleteDialogModule } from '../../shared/components/project-delete-dialog/project-delete-dialog.module';
import { ProjectPropertyEditFormModule } from '../../shared/components/project-property-edit-form/project-property-edit-form.module';
import { TaskDialogModule } from '../../shared/components/task-dialog/task-dialog.module';
import { BoardDetailHeaderComponent } from './components/board-detail-header/board-detail-header.component';
import { BoardDetailComponent } from './components/board-detail/board-detail.component';
import { ExampleHeaderComponent } from './components/example-header/example-header.component';
import { ExampleComponent } from './components/example/example.component';
import { ProjectPageRoutingModule } from './project-page-routing.module';
import { ProjectPageComponent } from './project-page.component';

@NgModule({
  declarations: [
    ProjectPageComponent,
    BoardDetailComponent,
    BoardDetailHeaderComponent,
    ExampleHeaderComponent,
    ExampleComponent,
    ProjectPageComponent
  ],
  imports: [
    CommonModule,
    ProjectPageRoutingModule,
    ProjectNavigationModule,
    SheetModule,
    ButtonModule,
    ProjectPropertyEditFormModule,
    SheetFooterModule,
    UserIconModule,
    TuiNotificationsModule,
    BoardCreateSheetModule,
    BoardUpdateSheetModule,
    BoardDeleteDialogModule,
    TaskDialogModule,
    MultiUserSelectPopupModule,
    IconModule,
    HeaderModule,
    PopupModule,
    MenuItemModule,
    TaskCardModule,
    DragDropModule,
    ProjectDeleteDialogModule,
    BoardDeleteDialogModule,
  ],
  exports: [ProjectPageComponent],
  providers: [
    {
      provide: APOLLO_DATA_QUERY,
      useClass: ApolloDataQuery,
    },
  ],
})
export class ProjectPageModule { }
