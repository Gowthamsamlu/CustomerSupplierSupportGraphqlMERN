import React from "react";
import { useSelector } from "react-redux";
import { ChatList, ChatBox, AddUser, NewChat } from "./";

const Dashboard = () => {
  const state = useSelector((state) => state.UserReducer);
  const [activePerson2Id, setActivePerson2Id] = React.useState("");
  const [newUserType, setNewUserType] = React.useState("");
  const [newChat, setNewChat] = React.useState(false);

  const updateChatId = (person2Id) => {
    setActivePerson2Id(person2Id);
  };

  const closePopup = () => {
    setNewUserType("");
    setNewChat(false);
  };

  return (
    <div className='flex justify-center'>
      <div className='flex-col w-full lg:w-7/12 bg-gray-300 px-4 lg:px-4 space-y-4 py-4'>
        <h1 className='text-xl text-custom-dark-blue ml-4'>
          Welcome {state.user.firstname}{" "}
          <span className='bg-custom-dark-blue text-xs font-medium mb-1 px-2.5 py-0.5 rounded text-white uppercase'>
            {state.user.accountType.trim()}
          </span>
        </h1>

        {state.user.accountType === "supplier" && (
          <div className='flex justify-start space-x-3 ml-4'>
            <button
              className='bg-custom-dark-blue text-gray-100 text-sm lg:text-lg font-semibold px-3 lg:px-5 py-1 lg:py-1.5 rounded-sm'
              onClick={(event) => {
                setNewChat(true);
              }}>
              New Chat
            </button>
            <button
              className='bg-custom-dark-blue text-gray-100 text-sm lg:text-lg font-semibold px-3 lg:px-5 py-1 lg:py-1.5 rounded-sm'
              onClick={(event) => {
                setNewUserType("cust");
              }}>
              Add Customer
            </button>
            <button
              className='bg-custom-dark-blue text-gray-100 text-sm lg:text-lg font-semibold px-3 lg:px-5 py-1 lg:py-1.5 rounded-sm'
              onClick={(event) => {
                setNewUserType("supp");
              }}>
              Add Supplier
            </button>
          </div>
        )}

        {newUserType !== "" && (
          <AddUser accountType={newUserType} closeConfirmation={closePopup} />
        )}
        {newChat && <NewChat closeConfirmation={closePopup} />}
        <div className='mt-4 grid grid-cols-4 gap-0 border-2 border-custom-dark-blue'>
          <ChatList updateChatId={updateChatId} />
          <div className='col-span-3 px-2 py-1'>
            {activePerson2Id !== "" ? (
              <ChatBox activeSecondPerson={activePerson2Id} />
            ) : (
              <p className='text-custom-dark-blue text-sm my-2 font-semibold'>
                Initiate Chat{" "}
                {state.user.accountType === "supplier"
                  ? "with 'New Chat' or select"
                  : "by selecting"}{" "}
                existing chats to continue.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
