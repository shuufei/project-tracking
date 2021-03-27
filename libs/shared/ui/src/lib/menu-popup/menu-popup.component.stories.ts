import { MenuPopupFeatureOption } from './menu-popup.component';
import { MenuPopupModule } from './menu-popup.module';

export default {
  title: 'MenuPopup',
};

const featureOption: MenuPopupFeatureOption = {
  edit: true,
  addSubtask: true,
  editPlannedTime: true,
  moveBoard: true,
  delete: true,
};

export const Default = () => ({
  moduleMetadata: {
    imports: [MenuPopupModule],
  },
  template: `
    <ui-menu-popup
      [triggerVisible]="true"
      [featureOption]="featureOption"
    ></ui-menu-popup>
  `,
  props: {
    featureOption,
  },
});
