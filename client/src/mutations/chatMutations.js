import { gql } from "@apollo/client";

const ADD_CHAT = gql`
  mutation addChat($message: String!, $sender: ID!, $recipient: ID!) {
    addChat(message: $message, sender: $sender, recipient: $recipient) {
      id
    }
  }
`;

export { ADD_CHAT };
