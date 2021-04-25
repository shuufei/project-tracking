import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoardItemModule } from './board-item/board-item.module';
import { ProjectCardModule } from './project-card/project-card.module';
import { ProjectNavigationModule } from './project-navigation/project-navigation.module';

@NgModule({
  imports: [
    CommonModule,
    ProjectCardModule,
    BoardItemModule,
    ProjectNavigationModule,
  ],
})
export class ProjectUiModule {}
