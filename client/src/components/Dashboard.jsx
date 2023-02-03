import React from "react";
import { useSelector } from "react-redux";
import { ChatList, ChatBox } from "./";

const Dashboard = () => {
  const state = useSelector((state) => state.UserReducer);
  const [activePerson2Id, setActivePerson2Id] = React.useState("");

  const updateChatId = (person2Id) => {
    setActivePerson2Id(person2Id);
  };
  return (
    <div className='flex justify-center'>
      <div className='flex-col w-full lg:w-7/12 bg-gray-300 px-4 lg:px-4 space-y-4 py-4'>
        <h1 className='text-xl text-custom-dark-blue ml-4'>
          Welcome {state.user.firstname},
        </h1>
        <div className='flex justify-start space-x-3 ml-4'>
          <button className='bg-custom-dark-blue text-gray-100 font-semibold px-5 py-1.5 rounded-sm'>
            New Chat
          </button>
          {state.user.accountType === "supplier" && (
            <>
              <button className='bg-custom-dark-blue text-gray-100 font-semibold px-3 py-1.5 rounded-sm'>
                Add Customer
              </button>
              <button className='bg-custom-dark-blue text-gray-100 font-semibold px-3 py-1.5 rounded-sm'>
                Add Supplier
              </button>
            </>
          )}
        </div>
        <div className='mt-4 grid grid-cols-4 gap-0 border-2 border-custom-dark-blue'>
          <ChatList updateChatId={updateChatId} />
          <div className='col-span-3 px-2 py-1'>
            {activePerson2Id !== "" ? (
              <ChatBox activeSecondPerson={activePerson2Id} />
            ) : (
              "Select an Item"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
