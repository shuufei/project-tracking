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
    <ui-sheet [triggerEl]="trigger" title="Sheet Title">
    </ui-sheet>
  `,
  props: {},
});

export const LongContents = () => ({
  moduleMetadata: {
    imports: [SheetModule],
  },
  template: `
    <button #trigger class="text-s1">open</button>
    <ui-sheet [triggerEl]="trigger" title="Sheet Title">
      <div>
        <p>
        {{message}}
        </p>
      </div>
    </ui-sheet>
  `,
  props: {
    message: Array(1000)
      .fill('test message. ')
      .reduce((acc, curr) => acc + curr, ''),
  },
});
