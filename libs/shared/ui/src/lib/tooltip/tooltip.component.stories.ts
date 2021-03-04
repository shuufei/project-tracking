import { TooltipModule } from './tooltip.module';

export default {
  title: 'Tooltip',
};

export const Default = () => ({
  moduleMetadata: {
    imports: [TooltipModule],
  },
  template: `
    <p uiTooltip="tooltip contents">tooltip direction: default</p>
  `,
  props: {},
});

export const left = () => ({
  moduleMetadata: {
    imports: [TooltipModule],
  },
  template: `
    <div class="flex justify-end">
      <p uiTooltip="tooltip contents" uiTooltipDirection="left">tooltip direction: left</p>
    </div>
  `,
  props: {},
});

export const right = () => ({
  moduleMetadata: {
    imports: [TooltipModule],
  },
  template: `
    <div class="flex justify-start">
      <p uiTooltip="tooltip contents" uiTooltipDirection="right">tooltip direction: right</p>
    </div>
  `,
  props: {},
});

export const bottom_left = () => ({
  moduleMetadata: {
    imports: [TooltipModule],
  },
  template: `
    <div class="flex justify-start">
      <p uiTooltip="tooltip contents" uiTooltipDirection="bottom-left">tooltip direction: bottom-left</p>
    </div>
  `,
  props: {},
});

export const bottom_right = () => ({
  moduleMetadata: {
    imports: [TooltipModule],
  },
  template: `
    <div class="flex justify-start">
      <p uiTooltip="tooltip contents" uiTooltipDirection="bottom-right">tooltip direction: bottom-right</p>
    </div>
  `,
  props: {},
});

export const top_left = () => ({
  moduleMetadata: {
    imports: [TooltipModule],
  },
  template: `
    <div class="flex justify-start mt-20">
      <p uiTooltip="tooltip contents" uiTooltipDirection="top-left">tooltip direction: top-left</p>
    </div>
  `,
  props: {},
});

export const top_right = () => ({
  moduleMetadata: {
    imports: [TooltipModule],
  },
  template: `
    <div class="flex justify-start mt-20">
      <p uiTooltip="tooltip contents" uiTooltipDirection="top-right">tooltip direction: top-right</p>
    </div>
  `,
  props: {},
});
