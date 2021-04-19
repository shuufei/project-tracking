import type { Color as DomainColor } from '@bison/shared/domain';
import { Color as ApiColor } from '@bison/shared/schema';

export const convertToDomainColorFromApiColor = (
  color: ApiColor
): DomainColor => {
  switch (color) {
    case ApiColor.BLUE:
      return 'blue';
    case ApiColor.GREEN:
      return 'green';
    case ApiColor.RED:
      return 'red';
    case ApiColor.YELLOW:
      return 'yellow';
    case ApiColor.BROWN:
      return 'brown';
    case ApiColor.PINK:
      return 'pink';
    case ApiColor.GRAY:
      return 'gray';
  }
};
