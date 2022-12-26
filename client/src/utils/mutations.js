import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation createUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CLOCK_IN = gql`
  mutation clockIn($clockedInTime: String!, $forDate: String!){
    clockIn(clockedInTime: $clockedInTime, forDate: $forDate) {
      _id
      hoursWorked {
        _id
        clockedInTime
        forDate
      }
    }
  }
`;

export const CLOCK_OUT = gql`
  mutation clockOut($clockedId: String!, $clockedOutTime: String!) {
    clockOut(clockedId: $clockedId, clockedOutTime: $clockedOutTime) {
      _id
      hoursWorked {
        clockedOutTime
      }
    }
  }
`;