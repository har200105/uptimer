import { gql } from '@apollo/client';

const authDataFragment = gql`
  fragment AuthData on AuthResponse {
    user {
      id
      username
      email
    }
    notifications {
      id
      groupName
      emails
      slack
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($user: Auth!) {
    registerUser(user: $user) {
      ...AuthData
    }
  }
  ${authDataFragment}
`;

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      ...AuthData
    }
  }
  ${authDataFragment}
`;

export const CHECK_CURRENT_USER = gql`
  query CheckCurrentUser {
    checkCurrentUser {
      user {
        id
        username
        email
      }
      notifications {
        id
        groupName
        emails
        slack
      }
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation {
    logout {
      message
    }
  }
`;
