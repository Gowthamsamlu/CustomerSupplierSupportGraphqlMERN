import { gql } from "@apollo/client";

const GET_CHATLIST = gql`
  query getChatList($stateUserId: ID!) {
    chatListQuery(loggedInUser: $stateUserId) {
      id
      message
      person2 {
        id
        firstname
        accountType
      }
      createdAt
      updatedAt
    }
  }
`;

const GET_SPECIFIC_CHAT = gql`
  query getMsgsList($stateUserId: ID!, $activeSecondPersonId: ID!) {
    chatMsgsQuery(
      loggedInUser: $stateUserId
      secondPerson: $activeSecondPersonId
    ) {
      id
      message
      sender {
        id
        firstname
        accountType
      }
      recipient {
        id
        firstname
        accountType
      }
      createdAt
    }
  }
`;

export { GET_CHATLIST, GET_SPECIFIC_CHAT };
