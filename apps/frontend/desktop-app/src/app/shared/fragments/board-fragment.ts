import { gql } from 'apollo-angular';
import { TASK_FIELDS, TASK_FRAGMENT_NAME } from './task-fragment';
import {
  TASK_GROUP_FIELDS,
  TASK_GROUP_FRAGMENT_NAME,
} from './task-group-fragment';

export const BOARD_FRAGMENT_NAME = 'BoardParts';
export const BOARD_FIELDS = gql`
  ${TASK_FIELDS}
  ${TASK_GROUP_FIELDS}
  fragment ${BOARD_FRAGMENT_NAME} on Board {
    id
    name
    description
    project {
      id
    }
    soloTasks {
      ...${TASK_FRAGMENT_NAME}
    }
    taskGroups {
      ...${TASK_GROUP_FRAGMENT_NAME}
    }
    tasksOrder {
      taskId
      type
    }
  }
`;
