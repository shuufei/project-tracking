import { SheetModule } from './sheet.module';

export default {
  title: 'Sheet',
};

export const Default = () => ({
  moduleMetadata: {
    imports: [SheetModule],
  },
  template: `
    <button #trigger class="text-s1">open</button>
    <ui-sheet [triggerEl]="trigger">
    </ui-sheet>
  `,
  props: {},
});
