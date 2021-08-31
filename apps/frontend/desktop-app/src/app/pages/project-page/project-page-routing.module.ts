import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardDetailHeaderComponent } from './components/board-detail-header/board-detail-header.component';
import { BoardDetailComponent } from './components/board-detail/board-detail.component';
import { ProjectDetailHeaderComponent } from './components/project-detail-header/project-detail-header.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';

const routes: Routes = [
  {
    path: 'boards/:boardId',
    component: BoardDetailComponent,
  },
  {
    path: 'boards/:boardId',
    component: BoardDetailHeaderComponent,
    outlet: 'header',
  },
  {
    path: 'detail',
    component: ProjectDetailComponent,
  },
  {
    path: 'detail',
    component: ProjectDetailHeaderComponent,
    outlet: 'header',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectPageRoutingModule { }
