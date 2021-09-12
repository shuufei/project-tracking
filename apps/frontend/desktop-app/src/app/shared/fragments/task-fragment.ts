import { gql } from 'apollo-angular';
import { SUBTASK_FIELDS, SUBTASK_FRAGMENT_NAME } from './subtask-fragment';

export const TASK_FRAGMENT_NAME = 'TaskParts';
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
      project {
        id
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
    }
    subtasks {
      ...${SUBTASK_FRAGMENT_NAME}
    }
    createdAt
  }
`;
