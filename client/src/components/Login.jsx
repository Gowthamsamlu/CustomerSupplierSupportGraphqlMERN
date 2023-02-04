import React from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { successLogin } from "../redux/Actions/Actions";

const Login = () => {
  const LOGIN_URL = "/user/signin";
  const dispatch = useDispatch();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const [validEmail, setEmailValidity] = React.useState(true);
  const [validPassword, setPassswordValidity] = React.useState(true);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [requestLoading, setRequestLoading] = React.useState(false);

  const validateCredentials = () => {
    setRequestLoading(true);
    try {
      axios
        .post(
          LOGIN_URL,
          JSON.stringify({
            email,
            password,
          }),
          { headers: { "Content-Type": "application/json" } },
        )
        .then((response) => {
          if (response.data.status === "success") {
            toast.success("Successful Login");
            dispatch(successLogin(response.data));
            setAuth({
              id: response.data.id,
              accessToken: response.data.token,
              accountType: response.data.accountType,
              firstname: response.data.firstname,
            });
            if (window.location.pathname === "/login") {
              navigate("/");
            }
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((err) => {
          switch (err.response.status) {
            case 500:
              toast.error("Server Error");
              break;
            case 400:
              toast.error("Invalid Credentials");
              break;
            default:
              toast.error("Something went wrong");
          }
          throw "Validation Error";
        });
    } catch (err) {
      console.log(err);
      toast.error("Error Signing In");
    } finally {
      setRequestLoading(false);
    }
  };

  return (
    <div className='flex justify-center py-20 px-10'>
      <div className='flex-col w-screen md:w-6/12 lg:w-3/12 lg:mt-10'>
        <h2 className='text-2xl font-semibold text-custom-dark-blue'>
          Welcome Back!
        </h2>
        <h4 className='mt-4 text-sm align-justify leading-tight text-custom-light-blue'>
          Thank you for getting back! Please enter your credentials to access
          customer support.
        </h4>
        <div className='mt-10 flex-col space-y-5'>
          <div className=''>
            <label
              htmlFor='Email'
              className={`block text-base font-medium ${
                !validEmail ? "text-red-700" : "text-custom-dark-blue"
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
              placeholder='Enter your email'
              onKeyDown={(event) => {
                if (event.key === "Enter") validateCredentials();
              }}
              onChange={(event) => {
                setEmailValidity(true);
                setEmail(event.target.value);
              }}
            />
            {!validEmail && (
              <p className='text-red-600 text-sm'>Invalid email address</p>
            )}
          </div>
          <div className=''>
            <label
              htmlFor='Email'
              className={`block text-base font-medium ${
                !validPassword ? "text-red-700" : "text-custom-dark-blue"
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
                if (event.key === "Enter") validateCredentials();
              }}
              onChange={(event) => {
                setPassswordValidity(true);
                setPassword(event.target.value);
              }}
            />
            {!validPassword && (
              <p className='text-red-600 text-sm'>Invalid Password</p>
            )}
          </div>
          <div className='w-full align-center'>
            {requestLoading ? (
              <div role='status'>
                <svg
                  aria-hidden='true'
                  className='w-8 h-8 mr-2 text-gray-200 animate-spin fill-custom-dark-blue'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='currentColor'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentFill'
                  />
                </svg>
                <span className='sr-only'>Loading...</span>
              </div>
            ) : (
              <button
                onClick={(event) => {
                  event.preventDefault();
                  if (email === "") setEmailValidity(false);
                  else if (password === "") setPassswordValidity(false);
                  else validateCredentials();
                }}
                className='w-full py-2 text-center tracking-wide font-normal text-gray-200 bg-custom-dark-blue rounded-md lg:rounded-sm lg:hover:rounded-lg duration-300'>
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
