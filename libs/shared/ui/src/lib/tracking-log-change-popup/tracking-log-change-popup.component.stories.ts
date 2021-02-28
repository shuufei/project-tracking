import { TrackingLogChangePopupModule } from './tracking-log-change-popup.module';

export default {
  title: 'TrackingLogChangePopupComponent',
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
