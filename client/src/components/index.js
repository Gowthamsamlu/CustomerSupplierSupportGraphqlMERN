export { default as Login } from "./Login";
export { default as Layout } from "./Layout";
export { default as Dashboard } from "./Dashboard";
export { default as ChatList } from "./ChatList";
export { default as ChatBox } from "./ChatBox";
export { default as Spinner } from "./Spinner";

export const formatDate = (unixTimestamp) => {
  const dateObj = new Date();
  return dateObj.toISOString().replace("T", " ").slice(0, 19).toString();
};
