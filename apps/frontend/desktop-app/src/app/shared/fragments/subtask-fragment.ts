import { gql } from 'apollo-angular';

export const SUBTASK_FRAGMENT_NAME = 'SubtaskParts';
export const SUBTASK_FIELDS = gql`
  fragment ${SUBTASK_FRAGMENT_NAME} on Subtask {
    id
    title
    description
    isDone
    workTimeSec
    scheduledTimeSec
    workStartDateTimestamp
    task {
      id
    }
    assign {
      id
      name
      icon
    }
    createdAt
  }
`;
