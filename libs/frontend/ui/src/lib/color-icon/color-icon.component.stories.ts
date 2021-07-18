import { ColorIconModule } from './color-icon.module';

export default {
  title: 'ColorIcon',
};

export const List = () => ({
  moduleMetadata: {
    imports: [ColorIconModule],
  },
  template: `
    <ui-color-icon class="m-2"></ui-color-icon>
    <ui-color-icon class="m-2" color="Red"></ui-color-icon>
    <ui-color-icon class="m-2" color="Blue"></ui-color-icon>
    <ui-color-icon class="m-2" color="Green"></ui-color-icon>
    <ui-color-icon class="m-2" color="Yellow"></ui-color-icon>
    <ui-color-icon class="m-2" color="Brown"></ui-color-icon>
    <ui-color-icon class="m-2" color="Pink"></ui-color-icon>
    <ui-color-icon class="m-2" color="Gray"></ui-color-icon>
  `,
  props: {},
});

export const Change_Size = () => ({
  moduleMetadata: {
    imports: [ColorIconModule],
  },
  template: `
    <ui-color-icon class="m-2 w-4 h-4"></ui-color-icon>
  `,
  props: {},
});
