import { SelectItemModule } from './select-item.module';

export default {
  title: 'SelectItem',
};

export const Default = () => ({
  moduleMetadata: {
    imports: [SelectItemModule],
  },
  template: `
    <ui-select-item>
      <p>select item</p>
    </ui-select-item>
  `,
  props: {},
});

export const Selected = () => ({
  moduleMetadata: {
    imports: [SelectItemModule],
  },
  template: `
    <ui-select-item [selected]="true">
      <p>select item</p>
    </ui-select-item>
  `,
  props: {},
});
