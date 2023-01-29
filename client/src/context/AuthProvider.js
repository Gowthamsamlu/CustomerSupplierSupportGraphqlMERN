import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/Actions/Actions";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [auth, setAuth] = React.useState({});
  const state = useSelector((state) => state.UserReducer);
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    const loggedInSecondsAgo =
      new Date().getTime() / 1000 - state?.loggedInTimestamp / 1000;
    if (isNaN(loggedInSecondsAgo) || loggedInSecondsAgo >= 3 * 60 * 60) {
      dispatch(logout(state));
      localStorage.removeItem(process.env.REACT_APP_LOCALSTORAGE_KEY);
      localStorage.clear();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
