import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/Actions/Actions";

const NavBar = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.UserReducer);

  return (
    <div className='h-16 min-h-16 bg-custom-dark-blue'>
      <div className='flex px-3 lg:px-16 h-full justify-between'>
        <div className='my-auto'>
          <span className='font-semibold text-2xl text-gray-100'>
            ABC Marketing
          </span>
        </div>
        <div className='my-auto'>
          <button
            className='bg-gray-300 text-custom-dark-blue font-semibold px-2 lg:px-4 py-1 hover:bg-gray-100 duration-300 rounded-sm'
            onClick={(event) => {
              event.preventDefault();
              dispatch(logout(state));
              localStorage.removeItem(process.env.REACT_APP_LOCALSTORAGE_KEY);
              localStorage.clear();
            }}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
