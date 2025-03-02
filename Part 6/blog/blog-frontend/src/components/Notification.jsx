const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  const notificationStyle = {
    success: {
      backgroundColor: "green",
      color: "white"
    },
    error: {
      backgroundColor: "red",
      color: "white"
    }
  };

  return (
    <div
      className="notification"
      style={notificationStyle[type]}
    >
      {message}
    </div>
  );
};

export default Notification;
