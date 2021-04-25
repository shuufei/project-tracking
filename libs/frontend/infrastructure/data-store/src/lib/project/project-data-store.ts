import { Injectable } from '@angular/core';
import {
  IProjectDataStore,
  Project as DomainProject,
} from '@bison/frontend/domain';
import { Project } from '@bison/shared/schema';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { convertToDomainColorFromApiColor } from '../util/convert-to-domain-color-from-api-color';
import { LIST_PROJECTS } from './gql/list-projects';

@Injectable()
export class ProjectDataStore implements IProjectDataStore {
  constructor(private apollo: Apollo) {}

  projects$() {
    return this.apollo
      .watchQuery<{ projects: Project[] }>({
        query: LIST_PROJECTS,
      })
      .valueChanges.pipe(
        map((response) => {
          const projects: DomainProject[] = response.data.projects.map(
            (project) => {
              const { id, name, description, color, members, admin } = project;
              const convertedProject: DomainProject = {
                id,
                name,
                description,
                color: convertToDomainColorFromApiColor(color),
                admin: {
                  id: admin.id,
                  name: admin.name,
                  icon: admin.icon,
                },
                members: members.map((member) => ({
                  id: member.id,
                  name: member.name,
                  icon: member.icon,
                })),
              };
              return convertedProject;
            }
          );
          return projects;
        })
      );
  }
}
