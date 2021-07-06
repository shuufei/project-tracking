import { SheetFooterModule } from './sheet-footer.module';

export default {
  title: 'SheetFooter',
};

export const Default = () => ({
  moduleMetadata: {
    imports: [SheetFooterModule],
  },
  template: `
    <ui-sheet-footer>
      <p left-side>left</p>
      <p center>center</p>
      <p right-side>right</p>
    </ui-sheet-footer>
  `,
  props: {},
});
