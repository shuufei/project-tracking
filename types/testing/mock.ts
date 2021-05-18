export type MockReturnValues<T> = {
  [k in keyof T]: T[k] extends (...args: any[]) => any
    ? UnwrapPromise<ReturnType<T[k]>>
    : never;
};

type UnwrapPromise<T> = T extends Promise<infer U> ? U : never;
