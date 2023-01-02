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
  mutation clockIn($clockedInTime: String!, $dbSalary: String!, $userTimeZone: String!) {
    clockIn(clockedInTime: $clockedInTime, dbSalary: $dbSalary, userTimeZone: $userTimeZone) {
      _id
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

export const ADD_SALARY = gql`
  mutation addSalary($salary: String!){
    addSalary(salary: $salary) {
      _id
      payAmount
    }
  }  
`;

export const DELETE_HOURS = gql`
  mutation deleteWorkHours($refId: String!) {
    deleteWorkHours(refId: $refId) {
      _id
    }
  }
`;

export const CLEAR_HISTORY = gql`
  mutation deleteHWHistory {
    deleteHWHistory {
      _id
    }
  }
`;