import { useContext } from "react";
import { useNotificationValue } from "../AnecdoteContext";
import AnecdoteContext from "../AnecdoteContext.jsx";

const Notification = ({ notification }) => {
  const [anecdote, dispatch] = useContext(AnecdoteContext);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  };

  if (!notification) return null;

  return <div style={style}>{notification}</div>;
};

export default Notification;
