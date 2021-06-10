import type { IProjectRepository } from '@bison/backend/domain';
import { PROJECT_REPOSITORY } from '@bison/backend/domain';
import { createProject } from '@bison/shared/domain';
import { Inject } from '@nestjs/common';
import type { ICreateProjectService } from './create-project.service.interface';

export class CreateProjectService implements ICreateProjectService {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository
  ) {}
  async handle(
    ...args: Parameters<ICreateProjectService['handle']>
  ): ReturnType<ICreateProjectService['handle']> {
    const [input] = args;
    const project = createProject(
      input.name,
      input.adminUserId,
      input.color,
      input.description
    );
    await this.projectRepository.create(project);
    return project;
  }
}
