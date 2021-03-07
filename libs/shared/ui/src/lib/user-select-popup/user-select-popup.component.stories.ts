import { User } from './user-select-popup.component';
import { UserSelectPopupModule } from './user-select-popup.module';

export default {
  title: 'UserSelectPopup',
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

export const Default = () => ({
  moduleMetadata: {
    imports: [UserSelectPopupModule],
  },
  template: `
    <button #triggerEl class="text-s1">open</button>
    <ui-user-select-popup [triggerEl]="triggerEl" [users]="users"></ui-user-select-popup>
  `,
  props: {
    users,
  },
});

export const Selected_User = () => ({
  moduleMetadata: {
    imports: [UserSelectPopupModule],
  },
  template: `
    <button #triggerEl class="text-s1">open</button>
    <ui-user-select-popup [triggerEl]="triggerEl" [users]="users" [selectedUserIds]="selectedUserIds"></ui-user-select-popup>
  `,
  props: {
    users,
    selectedUserIds: [users[0].id, users[1].id],
  },
});
