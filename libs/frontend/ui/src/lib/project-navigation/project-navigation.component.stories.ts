import { RouterTestingModule } from '@angular/router/testing';
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
    imports: [ProjectNavigationModule, RouterTestingModule],
  },
  component: ProjectNavigationComponent,
  props: {
    project,
  },
});

export const Boards = () => ({
  moduleMetadata: {
    imports: [ProjectNavigationModule, RouterTestingModule],
  },
  component: ProjectNavigationComponent,
  props: {
    project,
    boards,
  },
});
