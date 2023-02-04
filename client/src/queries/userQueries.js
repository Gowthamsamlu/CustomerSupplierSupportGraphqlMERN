import { gql } from "@apollo/client";

const GET_USERS = gql`
  query getUsers($stateUserId: ID!) {
    users(loggedInUser: $stateUserId) {
      id
      firstname
      lastname
      email
      phone
      accountType
      accountStatus
      errMessage
    }
  }
`;

export { GET_USERS };
