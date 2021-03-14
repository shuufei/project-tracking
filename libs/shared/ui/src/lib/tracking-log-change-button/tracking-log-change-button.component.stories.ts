import { TrackingLogChangeButtonModule } from './tracking-log-change-button.module';

export default {
  title: 'TrackingLogChangeButton',
};

export const Default = () => ({
  moduleMetadata: {
    imports: [TrackingLogChangeButtonModule],
  },
  template: `
    <ui-tracking-log-change-button></ui-tracking-log-change-button>
  `,
  props: {},
});

export const Set_Value = () => ({
  moduleMetadata: {
    imports: [TrackingLogChangeButtonModule],
  },
  template: `
    <ui-tracking-log-change-button
      [trackingTimeSec]="trackingTimeSec"
      [plannedTimeSec]="plannedTimeSec"
    ></ui-tracking-log-change-button>
  `,
  props: {
    trackingTimeSec: 60 * 60 * 2 + 60 * 30 + 45,
    plannedTimeSec: 60 * 60 * 3,
  },
});

export const Tracking = () => ({
  moduleMetadata: {
    imports: [TrackingLogChangeButtonModule],
  },
  template: `
    <ui-tracking-log-change-button
      [trackingTimeSec]="trackingTimeSec"
      [plannedTimeSec]="plannedTimeSec"
      [isTracking]="isTracking"
    ></ui-tracking-log-change-button>
  `,
  props: {
    trackingTimeSec: 60 * 60 * 2 + 60 * 30 + 45,
    plannedTimeSec: 60 * 60 * 3,
    isTracking: true,
  },
});
