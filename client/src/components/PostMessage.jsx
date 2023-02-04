import React from "react";
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";

import { GET_CHATLIST, GET_SPECIFIC_CHAT } from "../queries/chatQueries";
import { GET_USERS } from "../queries/userQueries";
import { ADD_CHAT } from "../mutations/chatMutations";

function PostMessage({
  activeSecondPerson,
  closePopup = false,
  closeConfirmation,
}) {
  const state = useSelector((state) => state.UserReducer);
  const [message, setMessage] = React.useState("");
  const [addChat] = useMutation(ADD_CHAT, {
    variables: {
      message,
      sender: state.user.id,
      recipient: activeSecondPerson,
    },
    refetchQueries: [
      {
        query: GET_SPECIFIC_CHAT,
        variables: {
          stateUserId: state.user.id,
          activeSecondPersonId: activeSecondPerson,
        },
      },
      {
        query: GET_CHATLIST,
        variables: { stateUserId: state.user.id },
      },
      {
        query: GET_USERS,
        variables: { stateUserId: state.user.id },
      },
    ],
  });

  const postMessage = () => {
    addChat(message);
    setMessage("");
    if (closeConfirmation) closeConfirmation();
  };
  return (
    <div className='grid grid-cols-12 gap-1 px-0 py-1 '>
      <div className='col-span-10 border-2 p-0.5'>
        <input
          type='test'
          name='Message'
          id='Message'
          maxLength='300'
          className={`p-2 border-2 border-custom-dark-blue focus:ring-custom-dark-blue
              w-full shadow-sm sm:text-sm rounded-sm focus:rounded-sm`}
          placeholder='Type Something'
          value={message}
          onKeyDown={(event) => {
            if (event.key === "Enter") postMessage();
          }}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
      </div>
      <div className='col-span-2 py-1'>
        <button
          onClick={(event) => {
            postMessage();
          }}
          className='w-full h-full text-center text-sm tracking-wide font-normal text-gray-200 bg-custom-dark-blue rounded-md lg:rounded-sm duration-300'>
          Send
        </button>
      </div>
    </div>
  );
}

export default PostMessage;
