import { Board } from './board-select-popup.component';
import { BoardSelectPopupModule } from './board-select-popup.module';

export default {
  title: 'BoardSelectPopupComponent',
};

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
    imports: [BoardSelectPopupModule],
  },
  template: `
    <button #trigger class="text-s1">open</button>
    <ui-board-select-popup
      [triggerEl]="trigger"
      [boards]="boards"
    ></ui-board-select-popup>
  `,
  props: {
    boards,
  },
});

export const Set_Selected_Value = () => ({
  moduleMetadata: {
    imports: [BoardSelectPopupModule],
  },
  template: `
    <button #trigger class="text-s1">open</button>
    <ui-board-select-popup
      [triggerEl]="trigger"
      [boards]="boards"
      [selectedBoardId]="selectedBoardId"
    ></ui-board-select-popup>
  `,
  props: {
    boards,
    selectedBoardId: boards[1].id,
  },
});
