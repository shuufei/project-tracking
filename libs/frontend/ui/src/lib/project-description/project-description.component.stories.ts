import { COLOR } from '@bison/shared/domain';
import { ProjectDescriptionModule } from './project-description.module';

export default {
  title: 'ProjectDescription'
}

const description = `プロジェクト管理アプリケーションの開発。
ボード管理、スケジュール管理、トラッキングの機能がメインとなる。`;

const props = {
  title: 'Bison',
  color: COLOR.Red,
  description,
};

export const Default = () => ({
  moduleMetadata: {
    imports: [ProjectDescriptionModule],
  },
  template: `
    <ui-project-description
      [title]="title"
      [color]="color"
      [description]="description"
    ></ui-project-description>
  `,
  props,
});