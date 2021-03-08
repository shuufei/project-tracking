import { CheckboxModule } from './checkbox.module';

export default {
  title: 'Checkbox',
};

export const Default = () => ({
  moduleMetadata: {
    imports: [CheckboxModule],
  },
  template: `
    <ui-checkbox></ui-checkbox>
  `,
  props: {},
});

export const Checked = () => ({
  moduleMetadata: {
    imports: [CheckboxModule],
  },
  template: `
    <ui-checkbox [checked]="true"></ui-checkbox>
  `,
  props: {},
});
