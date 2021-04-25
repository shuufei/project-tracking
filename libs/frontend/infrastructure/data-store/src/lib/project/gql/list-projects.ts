import { gql } from 'apollo-angular';

export const LIST_PROJECTS = gql`
  query ProjectsQuery {
    projects {
      id
      name
      description
      color
      boards {
        id
        name
        description
        project {
          id
        }
      }
      backlog {
        id
        project {
          id
        }
      }
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
    }
  }
`;
