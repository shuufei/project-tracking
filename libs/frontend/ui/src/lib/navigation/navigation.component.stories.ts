import { Navigation } from './navigation.component';
import { NavigationModule } from './navigation.module';

export default {
  title: 'Navigation',
};

const moduleMetadata = {
  imports: [NavigationModule],
};

export const Default = () => ({
  moduleMetadata,
  template: `
    <ui-navigation [list]="list" (clickNav)="onClickNavigation($event)"></ui-navigation>
  `,
  props: {
    list: [
      { menu: 'プロジェクト', routerLink: 'hoge' },
      { menu: 'スケジュール', routerLink: 'fuga' },
      { menu: 'レポート', routerLink: 'piyo' },
    ],
    onClickNavigation: (navigation: Navigation) => {
      console.log(navigation);
    },
  },
});
