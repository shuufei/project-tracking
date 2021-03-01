import { Icons } from './icon.component';
import { IconModule } from './icon.module';

export default {
  title: 'IconComponent',
};

const defaultSTemplate = Icons.map(
  (icon) => `<ui-icon size="s" icon="${icon}"></ui-icon>`
).join('');
export const default_s = () => ({
  moduleMetadata: {
    imports: [IconModule],
  },
  template: `
    ${defaultSTemplate}
  `,
  props: {},
});

const defaultMTemplate = Icons.map(
  (icon) => `<ui-icon size="m" icon="${icon}"></ui-icon>`
).join('');
export const default_m = () => ({
  moduleMetadata: {
    imports: [IconModule],
  },
  template: `
    ${defaultMTemplate}
  `,
  props: {},
});

const primarySTemplate = Icons.map(
  (icon) => `<ui-icon size="s" color="primary" icon="${icon}"></ui-icon>`
).join('');
export const primary_s = () => ({
  moduleMetadata: {
    imports: [IconModule],
  },
  template: `
    ${primarySTemplate}
  `,
  props: {},
});

const primaryMTemplate = Icons.map(
  (icon) => `<ui-icon size="m" color="primary" icon="${icon}"></ui-icon>`
).join('');
export const primary_m = () => ({
  moduleMetadata: {
    imports: [IconModule],
  },
  template: `
    ${primaryMTemplate}
  `,
  props: {},
});

const successSTemplate = Icons.map(
  (icon) => `<ui-icon size="s" color="success" icon="${icon}"></ui-icon>`
).join('');
export const success_s = () => ({
  moduleMetadata: {
    imports: [IconModule],
  },
  template: `
    ${successSTemplate}
  `,
  props: {},
});

const successMTemplate = Icons.map(
  (icon) => `<ui-icon size="m" color="success" icon="${icon}"></ui-icon>`
).join('');
export const success_m = () => ({
  moduleMetadata: {
    imports: [IconModule],
  },
  template: `
    ${successMTemplate}
  `,
  props: {},
});

const warnSTemplate = Icons.map(
  (icon) => `<ui-icon size="s" color="warn" icon="${icon}"></ui-icon>`
).join('');
export const warn_s = () => ({
  moduleMetadata: {
    imports: [IconModule],
  },
  template: `
    ${warnSTemplate}
  `,
  props: {},
});

const warnMTemplate = Icons.map(
  (icon) => `<ui-icon size="m" color="warn" icon="${icon}"></ui-icon>`
).join('');
export const warn_m = () => ({
  moduleMetadata: {
    imports: [IconModule],
  },
  template: `
    ${warnMTemplate}
  `,
  props: {},
});
