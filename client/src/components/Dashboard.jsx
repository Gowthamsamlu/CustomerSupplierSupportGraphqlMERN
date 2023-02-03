import React from "react";
import { useSelector } from "react-redux";
import ChatList from "./ChatList";

const Dashboard = () => {
  const state = useSelector((state) => state.UserReducer);
  return (
    <div className='flex justify-center'>
      <div className='flex-col w-full lg:w-9/12 bg-red-300 px-4 lg:px-2 space-y-2'>
        <h1 className='text-xl text-custom-dark-blue mt-4 '>
          Welcome {state.user.accountType},
        </h1>
        <div className='flex justify-start space-x-3'>
          <button className='bg-custom-dark-blue text-gray-100 font-semibold px-4 py-2 rounded-sm'>
            New Chat
          </button>
          {state.user.accountType === "supplier" && (
            <>
              <button className='bg-custom-dark-blue text-gray-100 font-semibold px-4 py-2 rounded-sm'>
                Add Customer
              </button>
              <button className='bg-custom-dark-blue text-gray-100 font-semibold px-4 py-2 rounded-sm'>
                Add Supplier
              </button>
            </>
          )}
        </div>
        <div className='grid grid-cols-4 gap-2'>
          <ChatList />
          <div className='col-span-3 bg-red-600 px-2 py-1'>Current Chat</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
