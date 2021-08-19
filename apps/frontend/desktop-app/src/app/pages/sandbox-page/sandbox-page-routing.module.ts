import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SandboxPageComponent } from './sandbox-page.component';

const routes: Routes = [
  {
    path: '',
    component: SandboxPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SandboxPageRoutingModule {}
