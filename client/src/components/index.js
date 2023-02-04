export { default as Login } from "./Login";
export { default as Layout } from "./Layout";
export { default as Dashboard } from "./Dashboard";
export { default as ChatList } from "./ChatList";
export { default as ChatBox } from "./ChatBox";
export { default as Spinner } from "./Spinner";
export { default as PostMessage } from "./PostMessage";
export { default as AddUser } from "./AddUser";
export { default as NewChat } from "./NewChat";
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDate = (unixTimestamp, length = 16) => {
  const dateObj = new Date(parseInt(unixTimestamp));

  return (
    ("0" + dateObj.getDate()).slice(-2) +
    " " +
    months[dateObj.getMonth() - 1] +
    " " +
    dateObj.getFullYear() +
    " " +
    dateObj.getHours() +
    ":" +
    ("0" + dateObj.getMinutes()).slice(-2)
  );
};
