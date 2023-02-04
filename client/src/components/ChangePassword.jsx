import { Fragment, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { Dialog, Transition } from "@headlessui/react";
import { CHANGE_PASSWORD } from "../mutations/userMutations";

export default function ChangePassword({ closePopup }) {
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  const [validOldPassword, setOldPasswordValidity] = useState(true);
  const [validNewPassword, setNewPasswordValidity] = useState(true);

  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const state = useSelector((state) => state.UserReducer);

  const [changePassword] = useMutation(CHANGE_PASSWORD, {
    variables: {
      oldPassword: oldpassword,
      newPassword: newpassword,
      loggedInUser: state.user.id,
    },
    refetchQueries: [
      //   {
      //     query: GET_SPECIFIC_CHAT,
      //     variables: {
      //       stateUserId: state.user.id,
      //     },
      //   },
    ],
  });

  const triggerChangePassword = async () => {
    const changePasswordResult = await changePassword(oldpassword, newpassword);
    if (changePasswordResult.data.changePassword.id === null)
      setErrMessage(changePasswordResult.data.changePassword.errMessage);
    else {
      toast.success("Updated Password");
      setOpen(false);
    }
  };

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => {
        closePopup();
      }}>
      <Dialog
        as='div'
        className='relative z-[60]'
        initialFocus={cancelButtonRef}
        onClose={() => {
          setOpen(false);
        }}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed z-50 inset-0 overflow-y-auto bg-gray-200 bg-opacity-60'>
          <div className='flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
              <Dialog.Panel className='relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full p-4'>
                <div className='flex-col'>
                  <h2 className='text-2xl font-semibold text-custom-dark-blue'>
                    Change Password
                  </h2>
                  <div className='mt-2 flex-col space-y-3'>
                    <div className=''>
                      <label
                        htmlFor='OldPassword'
                        className={`block text-base font-medium ${
                          !validOldPassword
                            ? "text-red-700"
                            : "text-custom-dark-blue"
                        }`}>
                        Existing Password
                      </label>
                      <input
                        type='password'
                        name='OldPassword'
                        id='OldPassword'
                        maxLength='30'
                        className={`mt-0.5 ${
                          !validOldPassword
                            ? "ring-red-800 focus:ring-red-800 border-red-800 focus:border-red-800 bg-red-100"
                            : "focus:ring-custom-dark-blue focus:border-custom-dark-blue bg-transparent"
                        } w-full shadow-sm sm:text-sm rounded-sm`}
                        placeholder='********'
                        onKeyDown={(event) => {
                          if (event.key === "Enter") triggerChangePassword();
                        }}
                        onChange={(event) => {
                          setOldPasswordValidity(true);
                          setOldPassword(event.target.value);
                        }}
                      />
                      {!validOldPassword && (
                        <p className='text-red-600 text-sm'>Invalid Password</p>
                      )}
                    </div>
                    <div className=''>
                      <label
                        htmlFor='NewPassword'
                        className={`block text-base font-medium ${
                          !validNewPassword
                            ? "text-red-700"
                            : "text-custom-dark-blue"
                        }`}>
                        New Password
                      </label>
                      <input
                        type='password'
                        name='password'
                        id='NewPassword'
                        maxLength='30'
                        className={`mt-0.5 ${
                          !validNewPassword
                            ? "ring-red-800 focus:ring-red-800 border-red-800 focus:border-red-800 bg-red-100"
                            : "focus:ring-custom-dark-blue focus:border-custom-dark-blue bg-transparent"
                        } w-full shadow-sm sm:text-sm rounded-sm`}
                        placeholder='********'
                        onKeyDown={(event) => {
                          if (event.key === "Enter") triggerChangePassword();
                        }}
                        onChange={(event) => {
                          setNewPasswordValidity(true);
                          setNewPassword(event.target.value);
                        }}
                      />
                      {!validNewPassword && (
                        <p className='text-red-600 text-sm'>Invalid Password</p>
                      )}
                      {errMessage && (
                        <p className='text-red-600 text-sm mt-2 font-semibold'>
                          {errMessage}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50  py-3 flex justify-end '>
                  <button
                    type='button'
                    className='mt-3 w-full inline-flex justify-center rounded-sm border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-notification-blue sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                    onClick={() => {
                      setOpen(false);
                      //   deleteConfirmation(false);
                    }}
                    ref={cancelButtonRef}>
                    Cancel
                  </button>
                  <button
                    type='button'
                    className='w-full inline-flex justify-center rounded-sm border border-transparent shadow-sm px-4 py-2 bg-custom-dark-blue text-base font-medium text-white hover:bg-custom-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-dark-blue sm:ml-3 sm:w-auto sm:text-sm'
                    onClick={(event) => {
                      event.preventDefault();
                      triggerChangePassword();
                      //   deleteConfirmation(true);
                    }}>
                    Update
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
