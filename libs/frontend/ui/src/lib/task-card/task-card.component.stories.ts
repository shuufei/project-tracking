import { SubtaskModule } from '../subtask/subtask.module';
import { TaskCardModule } from './task-card.module';

export default {
  title: 'TaskCard',
};

export const Default = () => ({
  moduleMetadata: {
    imports: [TaskCardModule],
  },
  template: `
    <div class="bg-primary-light3 p-4">
      <ui-task-card [title]="title"></ui-task-card>
    </div>
  `,
  props: {
    title: 'task title',
  },
});

export const Set_Other_Tracking_Time = () => ({
  moduleMetadata: {
    imports: [TaskCardModule],
  },
  template: `
    <div class="bg-primary-light3 p-4">
      <ui-task-card [title]="title" [otherTrackingTimeSec]="otherTrackingTimeSec"></ui-task-card>
    </div>
  `,
  props: {
    title: 'task title',
    otherTrackingTimeSec: 60 * 60 * 1 + 60 * 30,
  },
});

export const Set_Self_Tracking_Time = () => ({
  moduleMetadata: {
    imports: [TaskCardModule],
  },
  template: `
    <div class="bg-primary-light3 p-4">
      <ui-task-card [title]="title" [selfTrackingTimeSec]="selfTrackingTimeSec"></ui-task-card>
    </div>
  `,
  props: {
    title: 'task title',
    selfTrackingTimeSec: 60 * 60 * 1 + 60 * 30,
  },
});

export const Set_Tracking_Time = () => ({
  moduleMetadata: {
    imports: [TaskCardModule],
  },
  template: `
    <div class="bg-primary-light3 p-4">
      <ui-task-card
        [title]="title"
        [selfTrackingTimeSec]="selfTrackingTimeSec"
        [otherTrackingTimeSec]="otherTrackingTimeSec"
      ></ui-task-card>
    </div>
  `,
  props: {
    title: 'task title',
    selfTrackingTimeSec: 60 * 60 * 1 + 60 * 30,
    otherTrackingTimeSec: 60 * 60 * 3 + 60 * 30,
  },
});

export const Tracking = () => ({
  moduleMetadata: {
    imports: [TaskCardModule],
  },
  template: `
    <div class="bg-primary-light3 p-4">
      <ui-task-card
        [title]="title"
        [selfTrackingTimeSec]="selfTrackingTimeSec"
        [otherTrackingTimeSec]="otherTrackingTimeSec"
        [isTracking]="isTracking"
      ></ui-task-card>
    </div>
  `,
  props: {
    title: 'task title',
    selfTrackingTimeSec: 60 * 60 * 1 + 60 * 30,
    otherTrackingTimeSec: 60 * 60 * 3 + 60 * 30,
    isTracking: true,
  },
});

export const Set_Custom_Contents = () => ({
  moduleMetadata: {
    imports: [TaskCardModule, SubtaskModule],
  },
  template: `
    <div class="bg-primary-light3 p-4">
      <ui-task-card [title]="title">
        <ui-subtask></ui-subtask>
      </ui-task-card>
    </div>
  `,
  props: {
    title: 'task title',
  },
});

export const Set_Custom_Contents_With_Tracking_Time = () => ({
  moduleMetadata: {
    imports: [TaskCardModule, SubtaskModule],
  },
  template: `
    <div class="bg-primary-light3 p-4">
    <ui-task-card [title]="title" [selfTrackingTimeSec]="selfTrackingTimeSec">
        <ui-subtask></ui-subtask>
      </ui-task-card>
    </div>
  `,
  props: {
    title: 'task title',
    selfTrackingTimeSec: 60 * 60 * 1 + 60 * 30,
  },
});
