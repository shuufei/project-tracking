import { InputTimeModule } from './input-time.module';

export default {
  title: 'InputTimeComponent',
};

export const Default = () => ({
  moduleMetadata: {
    imports: [InputTimeModule],
  },
  template: `
    <ui-input-time>
    </ui-input-time>
  `,
  props: {},
});

export const Is_Disable_Zero = () => ({
  moduleMetadata: {
    imports: [InputTimeModule],
  },
  template: `
    <ui-input-time [isEnableZero]="false">
    </ui-input-time>
  `,
  props: {},
});

export const Set_Default_Value = () => ({
  moduleMetadata: {
    imports: [InputTimeModule],
  },
  template: `
    <ui-input-time [hours]="3" [minutes]="45" [seconds]="30">
    </ui-input-time>
  `,
  props: {},
});
