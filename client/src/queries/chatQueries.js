import { gql } from "@apollo/client";

const GET_CHATLIST = gql`
  query getChatList {
    chatListQuery(loggedInUser: "63d114240ebbe0a583e11106") {
      id
      message
      person2
      createdAt
      updatedAt
    }
  }
`;

export { GET_CHATLIST };
