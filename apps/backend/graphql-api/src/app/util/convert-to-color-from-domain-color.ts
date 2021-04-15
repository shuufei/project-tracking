import type { Color as DomainColor } from '@bison/shared/domain';
import { Color } from '../../schema-types';

export const convertToApiColorFromDomainColor = (color: DomainColor): Color => {
  switch (color) {
    case 'blue':
      return Color.BLUE;
    case 'green':
      return Color.GREEN;
    case 'red':
      return Color.RED;
    case 'yellow':
      return Color.YELLOW;
    case 'brown':
      return Color.BROWN;
    case 'pink':
      return Color.PINK;
    case 'gray':
      return Color.GRAY;
  }
};
