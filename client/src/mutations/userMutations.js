import { gql } from "@apollo/client";

const ADD_USER = gql`
  mutation addUser(
    $firstname: String!
    $lastname: String!
    $email: String!
    $phone: String!
    $accountType: UserAccountType!
    $password: String!
  ) {
    addUser(
      firstname: $firstname
      lastname: $lastname
      email: $email
      phone: $phone
      accountType: $accountType
      password: $password
    ) {
      id
      errMessage
    }
  }
`;

export { ADD_USER };
