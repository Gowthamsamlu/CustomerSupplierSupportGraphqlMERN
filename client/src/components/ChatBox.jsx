import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useSelector } from "react-redux";

import { Spinner, formatDate } from "./";
import { GET_SPECIFIC_CHAT } from "../queries/chatQueries";
import { ADD_CHAT } from "../mutations/chatMutations";

const ChatBox = ({ activeSecondPerson }) => {
  const state = useSelector((state) => state.UserReducer);
  const { loading, error, data } = useQuery(GET_SPECIFIC_CHAT, {
    variables: {
      stateUserId: state.user.id,
      activeSecondPersonId: activeSecondPerson,
    },
  });

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
    ],
  });

  const postMessage = () => {
    addChat(message);
    setMessage("");
  };

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;
  return (
    <>
      {!loading && !error && (
        <div className='flex justify-center'>
          <div className='flex-col w-10/12'>
            <div className='flex-col space-y-2 p-4 w-full '>
              {data.chatMsgsQuery.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={`flex ${
                      state.user.id === item.sender.id
                        ? "justify-end "
                        : "justify-start"
                    }`}>
                    <div
                      className={`${
                        state.user.id === item.sender.id
                          ? " bg-custom-dark-blue"
                          : "bg-gray-600"
                      } py-2 px-3 rounded-md text-sm text-white`}>
                      {item.message}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className='grid grid-cols-12 gap-1 px-3 py-1 '>
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
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;
