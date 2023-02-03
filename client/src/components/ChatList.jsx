import React from "react";
import { useQuery } from "@apollo/client";
import Spinner from "./Spinner";

import { GET_CHATLIST } from "../queries/chatQueries";

const ChatList = () => {
  const { loading, error, data } = useQuery(GET_CHATLIST);
  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;
  return <div>Chat lists</div>;
};

export default ChatList;
