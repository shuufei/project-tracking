import { UserIconListModule } from './user-icon-list.module';

export default {
  title: 'UserIconList',
};

export const Default_3_User = () => ({
  moduleMetadata: {
    imports: [UserIconListModule],
  },
  template: `
    <ui-user-icon-list [srcList]="srcList"></ui-user-icon-list>
  `,
  props: {
    srcList: [undefined, undefined, undefined],
  },
});
