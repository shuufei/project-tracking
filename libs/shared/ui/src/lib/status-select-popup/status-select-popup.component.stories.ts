import { StatusSelectPopupModule } from './status-select-popup.module';

export default {
  title: 'StatusSelectPopupComponent',
};

export const Not_Select = () => ({
  moduleMetadata: {
    imports: [StatusSelectPopupModule],
  },
  template: `
    <button #trigger class="text-s1">open</button>
    <ui-status-select-popup [triggerEl]="trigger"></ui-status-select-popup>
  `,
  props: {},
});

export const Selected_TODO = () => ({
  moduleMetadata: {
    imports: [StatusSelectPopupModule],
  },
  template: `
    <button #trigger class="text-s1">open</button>
    <ui-status-select-popup [triggerEl]="trigger" [currentStatus]="'TODO'"></ui-status-select-popup>
  `,
  props: {},
});
