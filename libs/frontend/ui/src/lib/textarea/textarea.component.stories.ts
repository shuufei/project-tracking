import { TextareaModule } from './textarea.module';

export default {
  title: 'Textarea',
};

export const Default = () => ({
  moduleMetadata: {
    imports: [TextareaModule],
  },
  template: `
    <ui-textarea placeholder="placeholder"></ui-textarea>
  `,
  props: {},
});

export const Set_Value = () => ({
  moduleMetadata: {
    imports: [TextareaModule],
  },
  template: `
    <ui-textarea [text]="'default text'"></ui-textarea>
  `,
  props: {},
});

export const Borderless = () => ({
  moduleMetadata: {
    imports: [TextareaModule],
  },
  template: `
    <ui-textarea placeholder="placeholder" [borderless]="true"></ui-textarea>
  `,
  props: {},
});
