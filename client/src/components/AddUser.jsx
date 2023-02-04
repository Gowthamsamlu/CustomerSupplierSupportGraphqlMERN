import { Fragment, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { Dialog, Transition } from "@headlessui/react";
import { ADD_USER } from "../mutations/userMutations";

export default function AddUser({ accountType, closeConfirmation }) {
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  const [validEmail, setEmailValidity] = useState(true);
  const [validPhone, setPhoneValidity] = useState(true);
  const [validPassword, setPasswordValidity] = useState(true);
  const [validFirstname, setFirstnameValidity] = useState(true);
  const [validLastname, setLastnameValidity] = useState(true);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const [addUser] = useMutation(ADD_USER, {
    variables: {
      firstname,
      lastname,
      email,
      phone,
      accountType,
      password,
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

  const triggerAddUser = async () => {
    const addResult = await addUser(
      firstname,
      lastname,
      email,
      phone,
      accountType,
      password,
    );
    console.log(addResult);
    if (addResult.data.addUser.id === null)
      setErrMessage(addResult.data.addUser.errMessage);
    else {
      toast.success("Added User!");
      setOpen(false);
    }
  };

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => {
        closeConfirmation();
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
                    New Chat
                  </h2>
                  <div className='mt-2 flex-col space-y-3'>
                    <div className='flex space-x-3'>
                      <div className='w-6/12'>
                        <label
                          htmlFor='Firstname'
                          className={`block text-base font-medium ${
                            !validFirstname
                              ? "text-red-700"
                              : "text-custom-dark-blue"
                          }`}>
                          Firstname
                        </label>
                        <input
                          type='text'
                          name='Firstname'
                          id='Firstname'
                          maxLength='30'
                          className={`mt-0.5 ${
                            !validFirstname
                              ? "ring-red-800 focus:ring-red-800 border-red-800 focus:border-red-800 bg-red-100"
                              : "focus:ring-custom-dark-blue focus:border-custom-dark-blue bg-transparent"
                          } w-full shadow-sm sm:text-sm rounded-sm`}
                          placeholder='Howard'
                          onKeyDown={(event) => {
                            if (event.key === "Enter") triggerAddUser();
                          }}
                          onChange={(event) => {
                            setFirstnameValidity(true);
                            setFirstname(event.target.value);
                          }}
                        />
                        {!validFirstname && (
                          <p className='text-red-600 text-sm'>
                            Invalid Firstname
                          </p>
                        )}
                      </div>
                      <div className='w-6/12'>
                        <label
                          htmlFor='Lastname'
                          className={`block text-base font-medium ${
                            !validLastname
                              ? "text-red-700"
                              : "text-custom-dark-blue"
                          }`}>
                          Lastname
                        </label>
                        <input
                          type='text'
                          name='Lastname'
                          id='Lastname'
                          maxLength='30'
                          className={`mt-0.5 ${
                            !validLastname
                              ? "ring-red-800 focus:ring-red-800 border-red-800 focus:border-red-800 bg-red-100"
                              : "focus:ring-custom-dark-blue focus:border-custom-dark-blue bg-transparent"
                          } w-full shadow-sm sm:text-sm rounded-sm`}
                          placeholder='Wolowitz'
                          onKeyDown={(event) => {
                            if (event.key === "Enter") triggerAddUser();
                          }}
                          onChange={(event) => {
                            setLastnameValidity(true);
                            setLastname(event.target.value);
                          }}
                        />
                        {!validLastname && (
                          <p className='text-red-600 text-sm'>
                            Invalid email address
                          </p>
                        )}
                      </div>
                    </div>
                    <div className='flex space-x-3'>
                      <div className='w-6/12'>
                        <label
                          htmlFor='Email'
                          className={`block text-base font-medium ${
                            !validEmail
                              ? "text-red-700"
                              : "text-custom-dark-blue"
                          }`}>
                          Email
                        </label>
                        <input
                          type='email'
                          name='Email'
                          id='Email'
                          maxLength='30'
                          className={`mt-0.5 ${
                            !validEmail
                              ? "ring-red-800 focus:ring-red-800 border-red-800 focus:border-red-800 bg-red-100"
                              : "focus:ring-custom-dark-blue focus:border-custom-dark-blue bg-transparent"
                          } w-full shadow-sm sm:text-sm rounded-sm`}
                          placeholder='someone@example.com'
                          onKeyDown={(event) => {
                            if (event.key === "Enter") triggerAddUser();
                          }}
                          onChange={(event) => {
                            setEmailValidity(true);
                            setEmail(event.target.value);
                          }}
                        />
                        {!validEmail && (
                          <p className='text-red-600 text-sm'>
                            Invalid email address
                          </p>
                        )}
                      </div>
                      <div className='w-6/12'>
                        <label
                          htmlFor='Phone'
                          className={`block text-base font-medium ${
                            !validPhone
                              ? "text-red-700"
                              : "text-custom-dark-blue"
                          }`}>
                          Phone
                        </label>
                        <input
                          type='tel'
                          name='Phone'
                          id='Phone'
                          maxLength='10'
                          className={`mt-0.5 ${
                            !validPhone
                              ? "ring-red-800 focus:ring-red-800 border-red-800 focus:border-red-800 bg-red-100"
                              : "focus:ring-custom-dark-blue focus:border-custom-dark-blue bg-transparent"
                          } w-full shadow-sm sm:text-sm rounded-sm`}
                          placeholder='9784563210'
                          onKeyDown={(event) => {
                            if (event.key === "Enter") triggerAddUser();
                          }}
                          onChange={(event) => {
                            setPhoneValidity(true);
                            setPhone(event.target.value);
                          }}
                        />
                        {!validPhone && (
                          <p className='text-red-600 text-sm'>
                            Invalid phonenumber
                          </p>
                        )}
                      </div>
                    </div>
                    <div className=''>
                      <label
                        htmlFor='Password'
                        className={`block text-base font-medium ${
                          !validPassword
                            ? "text-red-700"
                            : "text-custom-dark-blue"
                        }`}>
                        Password
                      </label>
                      <input
                        type='password'
                        name='password'
                        id='Password'
                        maxLength='30'
                        className={`mt-0.5 ${
                          !validPassword
                            ? "ring-red-800 focus:ring-red-800 border-red-800 focus:border-red-800 bg-red-100"
                            : "focus:ring-custom-dark-blue focus:border-custom-dark-blue bg-transparent"
                        } w-full shadow-sm sm:text-sm rounded-sm`}
                        placeholder='********'
                        onKeyDown={(event) => {
                          if (event.key === "Enter") triggerAddUser();
                        }}
                        onChange={(event) => {
                          setPasswordValidity(true);
                          setPassword(event.target.value);
                        }}
                      />
                      {!validPassword && (
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
                      triggerAddUser();
                      //   deleteConfirmation(true);
                    }}>
                    Add
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
