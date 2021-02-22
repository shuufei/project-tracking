import '../../../global-styles';
import { ColorsComponent } from './colors.component';

export default {
  title: 'sample/Colors',
};

export const list = () => ({
  moduleMetadata: {
    declarations: [ColorsComponent],
  },
  component: ColorsComponent,
  props: {},
});
