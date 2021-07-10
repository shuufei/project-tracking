import { gql } from 'apollo-angular';

export const GET_ME = gql`
  query MeQuery {
    viewer {
      id
      name
      icon
    }
  }
`;
