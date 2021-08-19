import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'project',
    loadChildren: () =>
      import('./pages/project-page/project-page.module').then(
        (m) => m.ProjectPageModule
      ),
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./pages/project-list-page/project-list-page.module').then(
        (m) => m.ProjectListPageModule
      ),
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
    redirectTo: '/project',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
