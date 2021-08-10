import { COLOR } from '@bison/shared/domain';
import { Board } from '../board-select-popup/board-select-popup.component';
import type { Project } from './project-board-select-popup.component';
import { ProjectBoardSelectPopupModule } from './project-board-select-popup.module';

export default {
  title: 'ProjectBoardSelectPopup',
};

const projects: Project[] = [
  {
    id: '1',
    name: 'Bison',
    color: COLOR.Green,
  },
  {
    id: '2',
    name: 'Arowana',
    color: COLOR.Red,
  },
  {
    id: '3',
    name: 'CapibaraCapibaraCapibaraCapibara',
    color: COLOR.Yellow,
  },
];
const boards: Board[] = [
  {
    id: '1',
    name: 'バックログ',
  },
  {
    id: '2',
    name: 'スプリント11',
  },
  {
    id: '3',
    name: 'スプリント12',
  },
  {
    id: '4',
    name: 'スプリント13スプリント13スプリント13',
  },
];

export const Default = () => ({
  moduleMetadata: {
    imports: [ProjectBoardSelectPopupModule],
  },
  template: `
    <button #trigger class="text-s1">open</button>
    <ui-project-board-select-popup
      [triggerEl]="trigger"
      [projects]="projects"
      [boards]="boards"
    ></ui-project-board-select-popup>
  `,
  props: {
    projects,
    boards,
  },
});

export const Set_Selected_Value = () => ({
  moduleMetadata: {
    imports: [ProjectBoardSelectPopupModule],
  },
  template: `
    <button #trigger class="text-s1">open</button>
    <ui-project-board-select-popup
      [triggerEl]="trigger"
      [projects]="projects"
      [boards]="boards"
      [selectedProjectId]="selectedProjectId"
      [selectedBoardId]="selectedBoardId"
    ></ui-project-board-select-popup>
  `,
  props: {
    projects,
    boards,
    selectedProjectId: projects[0].id,
    selectedBoardId: boards[1].id,
  },
});
