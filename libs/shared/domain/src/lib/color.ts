export const COLOR = {
  Red: 'Red',
  Blue: 'Blue',
  Green: 'Green',
  Yellow: 'Yellow',
  Brown: 'Brown',
  Pink: 'Pink',
  Gray: 'Gray',
} as const;

export type Color = typeof COLOR[keyof typeof COLOR];
