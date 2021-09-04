import { gql } from 'apollo-angular';

export const PROJECT_FRAGMENT_NAME = 'ProjectParts';
export const PROJECT_FIELDS = gql`
  fragment ${PROJECT_FRAGMENT_NAME} on Project {
    id
    name
    description
    color
    admin {
      id
      name
      icon
    }
    members {
      id
      name
      icon
    }
    boards {
      id
      name
      description
      project {
        id
      }
      createdAt
      tasksOrder {
        taskId
        type
      }
    }
  }
`;
