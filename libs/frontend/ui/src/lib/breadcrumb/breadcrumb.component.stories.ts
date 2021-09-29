import { RouterTestingModule } from '@angular/router/testing';
import { BreadcrumbModule } from './breadcrumb.module';

export default {
  title: 'Breadcrumb',
};

const moduleMetadata = {
  imports: [BreadcrumbModule, RouterTestingModule],
};

export const Default = () => ({
  moduleMetadata,
  template: `
    <ui-breadcrumb [breadcrumbs]="breadcrumbs"></ui-breadcrumb>
  `,
  props: {
    breadcrumbs: [
      { text: 'プロジェクト', routerLink: 'hoge' },
      { text: 'プロジェクト詳細', routerLink: 'fuga' },
      { text: 'ボード' },
    ],
  },
});
