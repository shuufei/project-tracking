import { gql } from 'apollo-angular';
import { SUBTASK_FIELDS, SUBTASK_FRAGMENT_NAME } from './subtask-fragment';

export const TASK_FRAGMENT_NAME = 'TaskPartsInTaskCard';
export const TASK_FIELDS = gql`
  ${SUBTASK_FIELDS}
  fragment ${TASK_FRAGMENT_NAME} on Task {
    id
    title
    description
    status
    workTimeSec
    scheduledTimeSec
    workStartDateTimestamp
    subtasksOrder
    board {
      id
      name
      description
      project {
        id
        name
      }
    }
    assign {
      id
      name
      icon
    }
    taskGroup {
      id
      title
      description
    }
    subtasks {
      ...${SUBTASK_FRAGMENT_NAME}
    }
  }
`;
