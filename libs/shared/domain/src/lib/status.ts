export const STATUS = {
  Todo: 'TODO',
  Inprogress: 'INPROGRESS',
  Confirm: 'CONFIRM',
  Done: 'DONE',
} as const;

export type Status = typeof STATUS[keyof typeof STATUS];
