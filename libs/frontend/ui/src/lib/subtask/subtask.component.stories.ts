import { SubtaskModule } from './subtask.module';

export default {
  title: 'Subtask',
};

export const Default = () => ({
  moduleMetadata: {
    imports: [SubtaskModule],
  },
  template: `
    <ui-subtask title="subtask title"></ui-subtask>
  `,
  props: {},
});

export const Done = () => ({
  moduleMetadata: {
    imports: [SubtaskModule],
  },
  template: `
    <ui-subtask title="subtask title" [done]="done"></ui-subtask>
  `,
  props: {
    done: true,
  },
});

export const Tracking = () => ({
  moduleMetadata: {
    imports: [SubtaskModule],
  },
  template: `
    <ui-subtask title="subtask title" [isTracking]="isTracking" [selfTrackingTimeSec]="selfTrackingTimeSec"></ui-subtask>
  `,
  props: {
    isTracking: true,
    selfTrackingTimeSec: 60 * 60 * 1 + 60 * 12,
  },
});

export const Editing = () => ({
  moduleMetadata: {
    imports: [SubtaskModule],
  },
  template: `
    <ui-subtask title="subtask title" [isEditing]="isEditing" title="subtask"></ui-subtask>
  `,
  props: {
    isEditing: true,
  },
});

export const Set_Work_Time = () => ({
  moduleMetadata: {
    imports: [SubtaskModule],
  },
  template: `
    <ui-subtask
      title="subtask title"
      [isTracking]="isTracking"
      [workTimeSec]="workTimeSec"
      [scheduledTimeSec]="scheduledTimeSec"
    ></ui-subtask>
  `,
  props: {
    isTracking: false,
    workTimeSec: 60 * 60 * 1 + 60 * 12,
    scheduledTimeSec: 60 * 60 * 1 + 60 * 30,
  },
});
