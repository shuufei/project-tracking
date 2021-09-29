import { RouterTestingModule } from '@angular/router/testing';
import { BackButtonModule } from './back-button.module';

export default {
  title: 'BackButton',
};

const moduleMetadata = {
  imports: [BackButtonModule, RouterTestingModule],
};

export const Default = () => ({
  moduleMetadata,
  template: `
    <ui-back-button class="m-4"></ui-back-button>
  `,
  props: {},
});
