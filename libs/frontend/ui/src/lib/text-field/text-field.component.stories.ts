import { TextFieldModule } from './text-field.module';

export default {
  title: 'TextField',
};

export const Default = () => ({
  moduleMetadata: {
    imports: [TextFieldModule],
  },
  template: `
    <ui-text-field></ui-text-field>
  `,
  props: {},
});

export const With_Icon = () => ({
  moduleMetadata: {
    imports: [TextFieldModule],
  },
  template: `
    <ui-text-field icon="search"></ui-text-field>
  `,
  props: {},
});

export const Set_Value = () => ({
  moduleMetadata: {
    imports: [TextFieldModule],
  },
  template: `
    <ui-text-field icon="search" [text]="'default text'"></ui-text-field>
  `,
  props: {},
});
