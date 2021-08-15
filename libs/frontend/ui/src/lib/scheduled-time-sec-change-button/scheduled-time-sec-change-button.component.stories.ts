import { ScheduledTimeSecChangeButtonModule } from './scheduled-time-sec-change-button.module';

export default {
  title: 'ScheduledTimeSecChangeButton',
};

export const Default = () => ({
  moduleMetadata: {
    imports: [ScheduledTimeSecChangeButtonModule],
  },
  template: `
    <ui-scheduled-time-sec-change-button></ui-scheduled-time-sec-change-button>
  `,
  props: {},
});
