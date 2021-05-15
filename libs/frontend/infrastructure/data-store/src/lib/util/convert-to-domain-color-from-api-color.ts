import { COLOR, Color as DomainColor } from '@bison/shared/domain';
import { Color as ApiColor } from '@bison/shared/schema';

export const convertToDomainColorFromApiColor = (
  color: ApiColor
): DomainColor => {
  switch (color) {
    case ApiColor.BLUE:
      return COLOR.Blue;
    case ApiColor.GREEN:
      return COLOR.Green;
    case ApiColor.RED:
      return COLOR.Red;
    case ApiColor.YELLOW:
      return COLOR.Yellow;
    case ApiColor.BROWN:
      return COLOR.Brown;
    case ApiColor.PINK:
      return COLOR.Pink;
    case ApiColor.GRAY:
      return COLOR.Gray;
  }
};
