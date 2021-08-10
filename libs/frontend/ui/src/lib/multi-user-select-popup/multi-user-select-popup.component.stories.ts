import { User } from '../user-select-popup/user-select-popup.component';
import { MultiUserSelectPopupModule } from './multi-user-select-popup.module';

export default {
  title: 'MultiUserSelectPopup',
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
    imports: [MultiUserSelectPopupModule],
  },
  template: `
    <button #triggerEl class="text-s1">open</button>
    <ui-multi-user-select-popup [triggerEl]="triggerEl" [users]="users"></ui-multi-user-select-popup>
  `,
  props: {
    users,
  },
});

export const Selected_User = () => ({
  moduleMetadata: {
    imports: [MultiUserSelectPopupModule],
  },
  template: `
    <button #triggerEl class="text-s1">open</button>
    <ui-multi-user-select-popup [triggerEl]="triggerEl" [users]="users" [selectedUserIds]="selectedUserIds"></ui-multi-user-select-popup>
  `,
  props: {
    users,
    selectedUserIds: [users[0].id, users[1].id],
  },
});
