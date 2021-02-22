import { ColorsComponent } from './colors.component';

export default {
  title: 'sample/Colors',
};

export const list = () => ({
  moduleMetadata: {
    imports: [],
    declarations: [ColorsComponent],
  },
  component: ColorsComponent,
  props: {},
});
