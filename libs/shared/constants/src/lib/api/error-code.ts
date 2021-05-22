export const ERROR_CODE = {
  xxx: 'xxx',
} as const;

export type ErrorCode = keyof typeof ERROR_CODE;
