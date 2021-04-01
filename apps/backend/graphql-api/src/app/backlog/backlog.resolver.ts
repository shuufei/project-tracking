import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import type { Backlog, Project } from '../../types';
import { Color } from '../../types';

@Resolver('Backlog')
export class BacklogReolver {
  @ResolveField()
  async project(
    @Parent() backlog: Backlog
  ): Promise<Omit<Project, 'backlog' | 'boards' | 'users'>> {
    return {
      id: 'sample_project_001',
      name: 'sample project 001',
      color: Color.BLUE,
    };
  }
}
