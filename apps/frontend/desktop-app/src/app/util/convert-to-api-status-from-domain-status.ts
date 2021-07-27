import { Status as DomainStatus, STATUS } from '@bison/shared/domain';
import { Status } from '@bison/shared/schema';

export const convertToApiStatusFromDomainStatus = (
  status: DomainStatus
): Status => {
  switch (status) {
    case STATUS.Todo:
      return Status.TODO;
    case STATUS.Inprogress:
      return Status.INPROGRESS;
    case STATUS.Confirm:
      return Status.CONFIRM;
    case STATUS.Done:
      return Status.DONE;
  }
};
