import { ButtonModule } from './button.module';

export default {
  title: 'Button',
};

const moduleMetadata = {
  imports: [ButtonModule],
};

export const Default = () => ({
  moduleMetadata,
  template: `
    <button ui-button class="m-4">Default</button>
    <button ui-button color="basic" class="m-4">Basic</button>
    <button ui-button color="primary" class="m-4">Primary</button>
    <button ui-button color="success" class="m-4">Success</button>
    <button ui-button color="warn" class="m-4">Warn</button>
  `,
  props: {},
});

export const Default_Disabled = () => ({
  moduleMetadata,
  template: `
    <button ui-button class="m-4" disabled>Disabled</button>
    <button ui-button color="basic" class="m-4" disabled>Basic</button>
    <button ui-button color="primary" class="m-4" disabled>Primary</button>
    <button ui-button color="success" class="m-4" disabled>Success</button>
    <button ui-button color="warn" class="m-4" disabled>Warn</button>
  `,
  props: {},
});

export const Stroked = () => ({
  moduleMetadata,
  template: `
    <button ui-stroked-button class="m-4">Default</button>
    <button ui-stroked-button color="basic" class="m-4">Basic</button>
    <button ui-stroked-button color="primary" class="m-4">Primary</button>
    <button ui-stroked-button color="success" class="m-4">Success</button>
    <button ui-stroked-button color="warn" class="m-4">Warn</button>
  `,
  props: {},
});

export const Stroked_Disabled = () => ({
  moduleMetadata,
  template: `
    <button ui-stroked-button class="m-4" disabled>Default</button>
    <button ui-stroked-button color="basic" class="m-4" disabled>Basic</button>
    <button ui-stroked-button color="primary" class="m-4" disabled>Primary</button>
    <button ui-stroked-button color="success" class="m-4" disabled>Success</button>
    <button ui-stroked-button color="warn" class="m-4" disabled>Warn</button>
  `,
  props: {},
});

export const Fill = () => ({
  moduleMetadata,
  template: `
    <button ui-fill-button class="m-4">Default</button>
    <button ui-fill-button color="basic" class="m-4">Basic</button>
    <button ui-fill-button color="primary" class="m-4">Primary</button>
    <button ui-fill-button color="primary-light3" class="m-4">Primary Light3</button>
    <button ui-fill-button color="success" class="m-4">Success</button>
    <button ui-fill-button color="warn" class="m-4">Warn</button>
  `,
  props: {},
});

export const Fill_Disabled = () => ({
  moduleMetadata,
  template: `
    <button ui-fill-button class="m-4" disabled>Default</button>
    <button ui-fill-button color="basic" class="m-4" disabled>Basic</button>
    <button ui-fill-button color="primary" class="m-4" disabled>Primary</button>
    <button ui-fill-button color="primary-light3" class="m-4" disabled>Primary Light3</button>
    <button ui-fill-button color="success" class="m-4" disabled>Success</button>
    <button ui-fill-button color="warn" class="m-4" disabled>Warn</button>
  `,
  props: {},
});
