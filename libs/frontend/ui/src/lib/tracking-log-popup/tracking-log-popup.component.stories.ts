import { UserTrackingInfo } from './tracking-log-popup.component';
import { TrackingLogPopupModule } from './tracking-log-popup.module';

export default {
  title: 'TrackingLogPopup',
};

const userTrackingInfoList: UserTrackingInfo[] = [
  {
    id: '1',
    name: '澤部 祐',
    trackingTime: {
      hours: 10,
      minutes: 0,
    },
  },
  {
    id: '2',
    name: '岩井 勇気',
    // eslint-disable-next-line max-len
    imageSrc:
      'data:image/png;base64,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',
    trackingTime: {
      hours: 2,
      minutes: 10,
    },
  },
  {
    id: '3',
    name: '宮下 遥',
    trackingTime: {
      hours: 0,
      minutes: 10,
    },
  },
];

export const Default = () => ({
  moduleMetadata: {
    imports: [TrackingLogPopupModule],
  },
  template: `
    <button #triggerEl class="text-s1">open</button>
    <ui-tracking-log-popup [triggerEl]="triggerEl" [userTrackingInfoList]="userTrackingInfoList"></ui-tracking-log-popup>
  `,
  props: {
    userTrackingInfoList,
  },
});
