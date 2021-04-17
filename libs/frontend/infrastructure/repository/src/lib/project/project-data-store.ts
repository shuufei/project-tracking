import { Injectable } from '@angular/core';
import { IProjectDataStore, Project } from '@bison/frontend/domain';
import { ProjectConnection } from '@bison/shared/schema';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { convertToDomainColorFromApiColor } from '../util/convert-to-domain-color-from-api-color';
import { LIST_PROJECTS } from './gql/list-projects';

@Injectable()
export class ProjectDataStore implements IProjectDataStore {
  constructor(private apollo: Apollo) {}

  projects$() {
    return this.apollo
      .watchQuery<{ projects: ProjectConnection }>({
        query: LIST_PROJECTS,
      })
      .valueChanges.pipe(
        map((response) => {
          const projects: Project[] = response.data.projects.edges.map(
            (edge) => {
              const { id, name, description, color, users } = edge.node;
              const project: Project = {
                id,
                name,
                description,
                color: convertToDomainColorFromApiColor(color),
                members: users.edges.map((userEdge) => ({
                  id: userEdge.node.id,
                  name: userEdge.node.name,
                  icon: userEdge.node.icon,
                })),
              };
              return project;
            }
          );
          return projects;
        })
      );
  }
}
