import { HeaderModule } from './header.module';

export default {
  title: 'Header',
};

export const Default = () => ({
  moduleMetadata: {
    imports: [HeaderModule],
  },
  template: `
    <ui-header>
      <p left>LEFT</p>
      <p center class="text-center">CENTER</p>
      <p right class="text-right">RIGHT</p>
    </ui-header>
  `,
  props: {},
});
