import { ColorSelectPopupModule } from './color-select-popup.module';

export default {
  title: 'ColorSelectPopup',
};

export const Default = () => ({
  moduleMetadata: {
    imports: [ColorSelectPopupModule],
  },
  template: `
    <button #triggerEl class="text-s1">open</button>
    <ui-color-select-popup [triggerEl]="triggerEl"></ui-color-select-popup>
  `,
  props: {},
});

export const Set_Value = () => ({
  moduleMetadata: {
    imports: [ColorSelectPopupModule],
  },
  template: `
    <button #trigger class="text-s1">open</button>
    <ui-color-select-popup [triggerEl]="trigger" currentColor="Red"></ui-color-select-popup>
  `,
  props: {},
});
