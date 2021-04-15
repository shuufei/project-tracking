import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProjectPageRoutingModule } from './project-page-routing.module';
import { ProjectPageComponent } from './project-page.component';

@NgModule({
  declarations: [ProjectPageComponent],
  imports: [CommonModule, ProjectPageRoutingModule],
})
export class ProjectPageModule {}
