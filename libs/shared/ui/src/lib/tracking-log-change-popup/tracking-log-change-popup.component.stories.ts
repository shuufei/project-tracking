import { TrackingLogChangePopupModule } from './tracking-log-change-popup.module';

export default {
  title: 'TrackingLogChangePopup',
};

export const Default = () => ({
  moduleMetadata: {
    imports: [TrackingLogChangePopupModule],
  },
  template: `
    <button #trigger class="text-s1">open</button>
    <ui-tracking-log-change-popup [triggerEl]="trigger"></ui-tracking-log-change-popup>
  `,
  props: {},
});

export const Set_Value = () => ({
  moduleMetadata: {
    imports: [TrackingLogChangePopupModule],
  },
  template: `
    <button #trigger class="text-s1">open</button>
    <ui-tracking-log-change-popup
      [triggerEl]="trigger"
      [trackingTime]="{hours: 2, minutes: 45, seconds: 30}"
      [plannedTime]="{hours: 6, minutes: 30, seconds: 00}"
    ></ui-tracking-log-change-popup>
  `,
  props: {},
});
