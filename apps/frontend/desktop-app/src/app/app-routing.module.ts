import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectPageComponent } from './pages/project-page/project-page.component';

const routes: Routes = [
  {
    path: 'projects',
    loadChildren: () =>
      import('./pages/project-list-page/project-list-page.module').then(
        (m) => m.ProjectListPageModule
      ),
  },
  {
    path: 'projects/:projectId',
    loadChildren: () =>
      import('./pages/project-page/project-page.module').then(
        (m) => m.ProjectPageModule
      ),
    component: ProjectPageComponent,
  },
  {
    path: 'sandbox',
    loadChildren: () =>
      import('./pages/sandbox-page/sandbox-page.module').then(
        (m) => m.SandboxPageModule
      ),
  },
  {
    path: '**',
    redirectTo: '/projects',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
