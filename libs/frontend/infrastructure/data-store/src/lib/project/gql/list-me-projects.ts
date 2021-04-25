import { gql } from 'apollo-angular';

export const LIST_ME_PROJECTS = gql`
  query MeProjectsQuery {
    viewer {
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
  }
`;
