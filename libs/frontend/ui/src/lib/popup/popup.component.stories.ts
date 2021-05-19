import { PopupModule } from './popup.module';

export default {
  title: 'Popup',
};

export const Default = () => ({
  moduleMetadata: {
    imports: [PopupModule],
  },
  template: `
    <button #trigger class="text-s1">open</button>
    <ui-popup [triggerEl]="trigger">
      <p class="text-s2">dummy content</p>
    </ui-popup>
  `,
  props: {},
});
