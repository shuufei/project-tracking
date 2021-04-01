import {
  IListProjectsUsecase,
  LIST_PROJECTS_USECASE,
} from '@bison/backend/usecase';
import { Module } from '@nestjs/common';
import { ProjectResolver } from './project.resolver';

class MockListProjectsUsecase implements IListProjectsUsecase {
  async execute() {
    return [];
  }
}

@Module({
  providers: [
    ProjectResolver,
    {
      provide: LIST_PROJECTS_USECASE,
      useValue: new MockListProjectsUsecase(),
    },
  ],
})
export class ProjectModule {}
