import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from './dialog.module';

export default {
  title: 'Dialog',
};

export const Default = () => ({
  moduleMetadata: {
    imports: [DialogModule, BrowserModule, BrowserAnimationsModule],
  },
  template: `
    <button #trigger class="text-s1">open</button>
    <ui-dialog [triggerEl]="trigger">
      <p>dialog</p>
    </ui-dialog>
  `,
  props: {},
});
