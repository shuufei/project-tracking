import type { User } from '../user-select-popup/user-select-popup.component';
import { AssignChangeButtonModule } from './assign-change-button.module';

export default {
  title: 'AssignChangeButton',
};

const users: User[] = [
  {
    id: '1',
    name: '澤部 祐',
  },
  {
    id: '2',
    name: '岩井 勇気',
  },
  {
    id: '3',
    name: '宮下 遥',
  },
];

export const Set_Users = () => ({
  moduleMetadata: {
    imports: [AssignChangeButtonModule],
  },
  template: `
    <ui-assign-change-button class="p-4" [users]="users"><ui-assign-change-button>
  `,
  props: {
    users,
  },
});

export const Set_Selected_Users = () => ({
  moduleMetadata: {
    imports: [AssignChangeButtonModule],
  },
  template: `
    <ui-assign-change-button class="p-4" [users]="users" [selectedUserId]="selectedUserId"><ui-assign-change-button>
  `,
  props: {
    users,
    selectedUserId: users[0].id,
  },
});
