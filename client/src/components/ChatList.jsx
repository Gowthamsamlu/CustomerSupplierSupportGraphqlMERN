import React from "react";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";

import { Spinner, formatDate } from "./";
import { GET_CHATLIST } from "../queries/chatQueries";

const ChatList = ({ updateChatId }) => {
  const state = useSelector((state) => state.UserReducer);
  const { loading, error, data } = useQuery(GET_CHATLIST, {
    variables: { stateUserId: state.user.id },
  });
  const [activePerson2Id, setActivePerson2Id] = React.useState("");
  const activateChatID = (person2Id) => {
    setActivePerson2Id(person2Id);
    updateChatId(person2Id);
  };

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div className='flex-col rounded-sm border-r-2 cursor-pointer border-gray-400'>
          {data.chatListQuery.map((item) => {
            return (
              <div
                key={item.id}
                className={`flex-col py-1.5 px-2.5 border-gray-400 border-b-1 ${
                  activePerson2Id === item.person2.id ? "bg-gray-400" : ""
                } rounded-sm duration-300`}
                onClick={(event) => {
                  activateChatID(item.person2.id);
                }}>
                <div className={`flex justify-between `}>
                  <div className='flex space-x-2'>
                    <h6
                      className={`${
                        activePerson2Id === item.person2.id
                          ? "font-semibold text-custom-dark-blue"
                          : "font-semibold text-custom-light-blue"
                      } text-sm duration-300`}>
                      {item.person2.firstname}
                    </h6>
                    {item.person2.accountType === "supplier" && (
                      <h4
                        className={`${
                          activePerson2Id === item.person2.id
                            ? "text-custom-dark-blue"
                            : "text-custom-light-blue"
                        } font-semibold text-xs my-auto duration-300`}>
                        Supplier
                      </h4>
                    )}
                  </div>
                  <h6
                    className={`${
                      activePerson2Id === item.person2.id
                        ? "font-semibold text-custom-dark-blue"
                        : "font-semibold text-custom-light-blue"
                    } mt-1 text-xs`}>
                    {formatDate(item.createdAt)}
                  </h6>
                </div>
                <h6
                  className={`${
                    activePerson2Id === item.person2.id
                      ? "font-normal text-custom-dark-blue"
                      : "font-normal text-custom-light-blue"
                  } text-sm -mt-0.5`}>
                  {item.message.length < 20
                    ? item.message
                    : item.message.slice(0, 20) + "..."}
                </h6>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ChatList;
