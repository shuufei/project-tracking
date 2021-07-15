import { Color as DomainColor } from '@bison/shared/domain';
import { Color as ApiColor } from '@bison/shared/schema';

// TODO: backendと共通化
export const convertToApiColorFromDomainColor = (
  color: DomainColor
): ApiColor => {
  switch (color) {
    case 'Blue':
      return ApiColor.BLUE;
    case 'Green':
      return ApiColor.GREEN;
    case 'Red':
      return ApiColor.RED;
    case 'Yellow':
      return ApiColor.YELLOW;
    case 'Brown':
      return ApiColor.BROWN;
    case 'Pink':
      return ApiColor.PINK;
    case 'Gray':
      return ApiColor.GRAY;
  }
};
