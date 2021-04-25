import { Color } from '@bison/shared/domain';
import { ProjectNavigationComponent } from './project-navigation.component';
import { ProjectNavigationModule } from './project-navigation.module';

export default {
  title: 'ProjectNavigation',
};

const project = { id: 0, name: 'Bison', color: 'green' as Color };

const boards = [
  { id: 0, name: 'スプリント0' },
  { id: 1, name: 'スプリント1' },
];

export const Default = () => ({
  moduleMetadata: {
    imports: [ProjectNavigationModule],
  },
  component: ProjectNavigationComponent,
  props: {
    project,
  },
});

export const Boards = () => ({
  moduleMetadata: {
    imports: [ProjectNavigationModule],
  },
  component: ProjectNavigationComponent,
  props: {
    project,
    boards,
  },
});

export const Selected = () => ({
  moduleMetadata: {
    imports: [ProjectNavigationModule],
  },
  template: `
    <ui-project-navigation
      [project]="project"
      [boards]="boards"
      [selectedProjectId]="selectedProjectId"
    ></ui-project-navigation>
    <ui-project-navigation
      class="mt-4"
      [project]="project"
      [boards]="boards"
      [selectedBoardId]="selectedBoardId"
    ></ui-project-navigation>
  `,
  props: {
    project,
    boards,
    selectedProjectId: project.id,
    selectedBoardId: boards[0].id,
  },
});
