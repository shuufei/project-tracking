import { gql } from 'apollo-angular';

export const LIST_PROJECTS = gql`
  query ProjectsQuery {
    projects {
      edges {
        node {
          id
          name
          description
          color
          boards {
            edges {
              node {
                id
                name
                description
                isArchived
                project {
                  id
                }
              }
            }
          }
          backlog {
            id
            project {
              id
            }
          }
          # admin {
          #   id
          #   name
          #   icon
          # }
          users {
            edges {
              node {
                id
                name
                icon
              }
            }
          }
        }
      }
    }
  }
`;
