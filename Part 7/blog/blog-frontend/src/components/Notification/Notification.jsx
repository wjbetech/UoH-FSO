import { useSelector } from "react-redux";

const Notification = ({ type }) => {
  const notification = useSelector((state) => state.notification);

  // may need to be set as !notification.message
  if (!notification.message) {
    return null;
  }

  const notificationStyle = {
    success: {
      backgroundColor: "green",
      color: "white",
    },
    error: {
      backgroundColor: "red",
      color: "white",
    },
  };

  return (
    <div className="notification" style={notificationStyle[notification.type]}>
      {notification.message}
    </div>
  );
};

export default Notification;
