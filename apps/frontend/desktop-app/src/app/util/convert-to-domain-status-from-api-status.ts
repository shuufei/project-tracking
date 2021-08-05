import { Status as DomainStatus, STATUS } from '@bison/shared/domain';
import { Status } from '@bison/shared/schema';

export const convertToDomainStatusFromApiStatus = (
  status: Status
): DomainStatus => {
  switch (status) {
    case Status.TODO:
      return STATUS.Todo;
    case Status.INPROGRESS:
      return STATUS.Inprogress;
    case Status.CONFIRM:
      return STATUS.Confirm;
    case Status.DONE:
      return STATUS.Done;
  }
};
