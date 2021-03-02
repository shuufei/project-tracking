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
    <ui-color-icon class="m-2" color="red"></ui-color-icon>
    <ui-color-icon class="m-2" color="blue"></ui-color-icon>
    <ui-color-icon class="m-2" color="green"></ui-color-icon>
    <ui-color-icon class="m-2" color="yellow"></ui-color-icon>
    <ui-color-icon class="m-2" color="brown"></ui-color-icon>
    <ui-color-icon class="m-2" color="pink"></ui-color-icon>
    <ui-color-icon class="m-2" color="gray"></ui-color-icon>
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
