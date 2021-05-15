import { COLOR, Color as DomainColor } from '@bison/shared/domain';
import { Color } from '@bison/shared/schema';

export const convertToApiColorFromDomainColor = (color: DomainColor): Color => {
  switch (color) {
    case COLOR.Blue:
      return Color.BLUE;
    case COLOR.Green:
      return Color.GREEN;
    case COLOR.Red:
      return Color.RED;
    case COLOR.Yellow:
      return Color.YELLOW;
    case COLOR.Brown:
      return Color.BROWN;
    case COLOR.Pink:
      return Color.PINK;
    case COLOR.Gray:
      return Color.GRAY;
  }
};
