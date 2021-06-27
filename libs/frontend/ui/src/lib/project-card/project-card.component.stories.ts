import { COLOR } from '@bison/shared/domain';
import { ProjectCardModule } from './project-card.module';

export default {
  title: 'ProjectCard',
};

const description = `プロジェクト管理アプリケーションの開発。
ボード管理、スケジュール管理、トラッキングの機能がメインとなる。`;

const props = {
  title: 'Bison',
  color: COLOR.Red,
  description,
  admin: {},
  members: [{}, {}, {}],
};

export const Default = () => ({
  moduleMetadata: {
    imports: [ProjectCardModule],
  },
  template: `
    <ui-project-card
      [title]="title"
      [color]="color"
      [description]="description"
      [admin]="admin"
      [members]="members"
    ></ui-project-card>
  `,
  props,
});

export const Under_Divide = () => ({
  moduleMetadata: {
    imports: [ProjectCardModule],
  },
  template: `
    <ui-project-card
      [title]="title"
      [color]="color"
      [description]="description"
      [admin]="admin"
      [members]="members"
      [underDivide]="true"
    ></ui-project-card>
  `,
  props,
});
