import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  {
    user {
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
    {
      me {
          _id
          username
          email
      }
    }
`;