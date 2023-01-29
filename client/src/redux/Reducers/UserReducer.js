const initialState = {
  user: null,
  isFetching: false,
  isError: false,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_LOGIN":
      return {
        user: null,
        isFetching: true,
        isError: false,
      };
    case "SUCCESS_LOGIN":
      return {
        user: action.payload,
        loggedInTimestamp: new Date().getTime(),
        isFetching: false,
        isError: false,
      };
    case "FAILED_LOGIN":
      return {
        user: null,
        isFetching: false,
        isError: action.payload,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default UserReducer;
