import { SubtaskModule } from './subtask.module';

export default {
  title: 'Subtask',
};

export const Default = () => ({
  moduleMetadata: {
    imports: [SubtaskModule],
  },
  template: `
    <ui-subtask></ui-subtask>
  `,
  props: {},
});

export const Done = () => ({
  moduleMetadata: {
    imports: [SubtaskModule],
  },
  template: `
    <ui-subtask [done]="done"></ui-subtask>
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
    <ui-subtask [isTracking]="isTracking" [selfTrackingTimeSec]="selfTrackingTimeSec"></ui-subtask>
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
    <ui-subtask [isEditing]="isEditing"></ui-subtask>
  `,
  props: {
    isEditing: true,
  },
});

export const Set_Self_Tracking_Time = () => ({
  moduleMetadata: {
    imports: [SubtaskModule],
  },
  template: `
    <ui-subtask
      [isTracking]="isTracking"
      [selfTrackingTimeSec]="selfTrackingTimeSec"
      [selfPlannedTimeSec]="selfPlannedTimeSec"
    ></ui-subtask>
  `,
  props: {
    isTracking: false,
    selfTrackingTimeSec: 60 * 60 * 1 + 60 * 12,
    selfPlannedTimeSec: 60 * 60 * 1 + 60 * 30,
  },
});

export const Set_Other_Tracking_Time = () => ({
  moduleMetadata: {
    imports: [SubtaskModule],
  },
  template: `
    <ui-subtask
      [otherTrackingTimeSec]="otherTrackingTimeSec"
    ></ui-subtask>
  `,
  props: {
    isTracking: false,
    otherTrackingTimeSec: 60 * 60 * 3 + 60 * 25,
  },
});
