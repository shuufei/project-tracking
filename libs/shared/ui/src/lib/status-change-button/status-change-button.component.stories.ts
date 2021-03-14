import { StatusChangeButtonModule } from './status-change-button.module';

export default {
  title: 'StatusChangeButton',
};

export const Default = () => ({
  moduleMetadata: {
    imports: [StatusChangeButtonModule],
  },
  template: `
    <ui-status-change-button class="p-8"><ui-status-change-button>
  `,
  props: {},
});

export const Set_Value = () => ({
  moduleMetadata: {
    imports: [StatusChangeButtonModule],
  },
  template: `
    <ui-status-change-button class="p-8" [status]="status"><ui-status-change-button>
  `,
  props: {
    status: 'DONE',
  },
});
