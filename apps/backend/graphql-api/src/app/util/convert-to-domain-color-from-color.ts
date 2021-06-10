import { COLOR, Color as DomainColor } from '@bison/shared/domain';
import { Color } from '@bison/shared/schema';

export const convertToDomainColorFromColor = (color: Color): DomainColor => {
  switch (color) {
    case Color.BLUE:
      return COLOR.Blue;
    case Color.GREEN:
      return COLOR.Green;
    case Color.RED:
      return COLOR.Red;
    case Color.YELLOW:
      return COLOR.Yellow;
    case Color.BROWN:
      return COLOR.Brown;
    case Color.PINK:
      return COLOR.Pink;
    case Color.GRAY:
      return COLOR.Gray;
  }
};
