import { TimeLabelModule } from './time-label.module';

export default {
  title: 'TimeLabel',
};

export const Default = () => ({
  moduleMetadata: {
    imports: [TimeLabelModule],
  },
  template: `
    <ui-time-label></ui-time-label>
  `,
  props: {},
});

export const Editable = () => ({
  moduleMetadata: {
    imports: [TimeLabelModule],
  },
  template: `
    <ui-time-label [status]="status"></ui-time-label>
  `,
  props: {
    status: 'editable',
  },
});

export const Readonly = () => ({
  moduleMetadata: {
    imports: [TimeLabelModule],
  },
  template: `
    <ui-time-label [status]="status"></ui-time-label>
  `,
  props: {
    status: 'readonly',
  },
});

export const Tracking = () => ({
  moduleMetadata: {
    imports: [TimeLabelModule],
  },
  template: `
    <ui-time-label [status]="status"></ui-time-label>
  `,
  props: {
    status: 'tracking',
  },
});

export const Set_Value = () => ({
  moduleMetadata: {
    imports: [TimeLabelModule],
  },
  template: `
    <ui-time-label [sec]="sec"></ui-time-label>
  `,
  props: {
    sec: 60 * 60 * 2 + 60 * 35,
  },
});

export const Show_Seconds = () => ({
  moduleMetadata: {
    imports: [TimeLabelModule],
  },
  template: `
    <ui-time-label [sec]="sec" [isShowSec]="true"></ui-time-label>
  `,
  props: {
    sec: 60 * 60 * 2 + 60 * 35 + 30,
  },
});
