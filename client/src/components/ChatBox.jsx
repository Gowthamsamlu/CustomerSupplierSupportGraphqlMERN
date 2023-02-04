import React from "react";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";

import { Spinner, PostMessage, formatDate } from "./";
import { GET_SPECIFIC_CHAT } from "../queries/chatQueries";

const ChatBox = ({ activeSecondPerson }) => {
  const state = useSelector((state) => state.UserReducer);
  const { loading, error, data } = useQuery(GET_SPECIFIC_CHAT, {
    variables: {
      stateUserId: state.user.id,
      activeSecondPersonId: activeSecondPerson,
    },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;
  return (
    <>
      {!loading && !error && (
        <div className='flex justify-center'>
          <div className='flex-col w-10/12'>
            <div className='flex-col space-y-2 p-4 w-full overflow-y-auto'>
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
                      } py-2 px-3 rounded-md flex-col space-y-0`}>
                      <div className='flex justify-between space-x-4'>
                        <h6
                          className={`font-semibold -mt-0.5 text-white opacity-50 text-sm duration-300`}>
                          {item.sender.firstname}
                        </h6>
                        <h6
                          className={`font-normal mt-0.5 text-white opacity-50 text-xs duration-300`}>
                          {formatDate(item.createdAt, 16)}
                        </h6>
                      </div>
                      <div className='text-sm text-white'>{item.message}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className='px-3'>
              <PostMessage activeSecondPerson={activeSecondPerson} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;
