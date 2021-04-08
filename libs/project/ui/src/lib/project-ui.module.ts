import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProjectCardModule } from './project-card/project-card.module';
import { ProjectNavigationModule } from './project-navigation/project-navigation.module';

@NgModule({
  imports: [CommonModule, ProjectCardModule, ProjectNavigationModule],
})
export class ProjectUiModule {}
