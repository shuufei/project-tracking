import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProjectCardModule } from './project-card/project-card.module';

@NgModule({
  imports: [CommonModule, ProjectCardModule],
})
export class ProjectUiModule {}
