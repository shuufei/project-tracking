import { ColorComponent } from './color.component';

export default {
  title: 'Theme/Default/Color',
};

export const list = () => ({
  moduleMetadata: {
    declarations: [ColorComponent],
  },
  template: `<bison-color></bison-color>`,
  props: {},
});
