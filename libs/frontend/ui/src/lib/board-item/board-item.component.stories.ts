import { BoardItemModule } from './board-item.module';

export default {
  title: 'BoardItem',
};

export const Default = () => ({
  moduleMetadata: {
    imports: [BoardItemModule],
  },
  template: `
    <ui-board-item
      [boardName]="boardName"
      [date]="date"
    ></ui-board-item>
  `,
  props: {
    boardName: 'ボード',
    date: new Date('2020-01-20'),
  },
});
