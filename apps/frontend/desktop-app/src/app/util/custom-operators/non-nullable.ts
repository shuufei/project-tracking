import { pipe } from 'rxjs';
import { filter } from 'rxjs/operators';

export const nonNullable = <T>() => {
  return pipe(filter((v: T | undefined): v is NonNullable<T> => v != null));
};
