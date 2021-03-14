import { TrackingLogChangeControllerModule } from './tracking-log-change-controller.module';

export default {
  title: 'TrackingLogChangeController',
};

export const Default = () => ({
  moduleMetadata: {
    imports: [TrackingLogChangeControllerModule],
  },
  template: `
    <ui-tracking-log-change-controller></ui-tracking-log-change-controller>
  `,
  props: {},
});

export const Set_Value = () => ({
  moduleMetadata: {
    imports: [TrackingLogChangeControllerModule],
  },
  template: `
    <ui-tracking-log-change-controller
      [trackingTimeSec]="trackingTimeSec"
      [plannedTimeSec]="plannedTimeSec"
    ></ui-tracking-log-change-controller>
  `,
  props: {
    trackingTimeSec: 60 * 60 * 2 + 60 * 30 + 45,
    plannedTimeSec: 60 * 60 * 3,
  },
});

export const Tracking = () => ({
  moduleMetadata: {
    imports: [TrackingLogChangeControllerModule],
  },
  template: `
    <ui-tracking-log-change-controller
      [trackingTimeSec]="trackingTimeSec"
      [plannedTimeSec]="plannedTimeSec"
      [isTracking]="isTracking"
    ></ui-tracking-log-change-controller>
  `,
  props: {
    trackingTimeSec: 60 * 60 * 2 + 60 * 30 + 45,
    plannedTimeSec: 60 * 60 * 3,
    isTracking: true,
  },
});
