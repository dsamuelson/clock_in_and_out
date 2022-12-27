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
          hoursWorked {
            _id
            clockedInTime
            clockedOutTime
            forDate
            payAmount
          }
          clockedIn
          payAmount
          currentHWId
      }
    }
`;

export const QUERY_DB_SALARY = gql`
    {
      me {
        payAmount
      }
    }
`;