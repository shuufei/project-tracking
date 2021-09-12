import { gql } from 'apollo-angular';
import { TASK_FIELDS, TASK_FRAGMENT_NAME } from './task-fragment';

export const TASK_GROUP_FRAGMENT_NAME = 'TaskGroupParts';

export const TASK_GROUP_FIELDS = gql`
  ${TASK_FIELDS}
  fragment ${TASK_GROUP_FRAGMENT_NAME} on TaskGroup {
    id
    title
    description
    status
    scheduledTimeSec
    tasksOrder
    assign {
      id
      name
      icon
    }
    board {
      id
      name
      project {
        id
        name
      }
    }
    tasks {
      ...${TASK_FRAGMENT_NAME}
    }
  }
`;
