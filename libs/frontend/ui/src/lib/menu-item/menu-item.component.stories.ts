import type { IconName } from '../icon/icon.component';
import type { Color } from '../types';
import { MenuItemModule } from './menu-item.module';

export default {
  title: 'MenuItem',
};

export const Default = () => ({
  moduleMetadata: {
    imports: [MenuItemModule],
  },
  template: `
    <ui-menu-item
      [itemName]="'編集'"
      [color]="primaryColor"
      [icon]="editIcon"
    ></ui-menu-item>
    <ui-menu-item
      [itemName]="'サブタスクを追加'"
      [color]="primaryColor"
      [icon]="plusIcon"
    ></ui-menu-item>
    <ui-menu-item
      [itemName]="'削除'"
      [color]="warnColor"
      [icon]="trashIcon"
    ></ui-menu-item>
  `,
  props: {
    primaryColor: 'primary' as Color,
    warnColor: 'warn' as Color,
    editIcon: 'edit-2' as IconName,
    plusIcon: 'plus' as IconName,
    trashIcon: 'trash-2' as IconName,
  },
});
