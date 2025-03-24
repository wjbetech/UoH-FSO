import { useSelector } from "react-redux";

// mui components
import Alert from "@mui/material/Alert";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Notification = ({ type }) => {
  const notification = useSelector((state) => state.notification);

  // may need to be set as !notification.message
  if (!notification.message) {
    return null;
  }

  const notificationStyle = {
    success: {
      backgroundColor: "rgb(30, 148, 0)",
      color: "white",
      position: "fixed",
      top: "0px",
      left: "0px",
      width: "100%",
      zIndex: 1000,
    },
    error: {
      backgroundColor: "rgb(161, 0, 0)",
      color: "white",
      position: "fixed",
      top: "0px",
      left: "0px",
      width: "100%",
      zIndex: 1000,
    },
  };

  return (
    <Alert
      style={notificationStyle[notification.type]}
      icon={
        notification.type === "error" ? (
          <ErrorIcon sx={{ color: "#ff0000" }} />
        ) : (
          <CheckCircleIcon sx={{ color: "#00ff44" }} />
        )
      }
    >
      {notification.message}
    </Alert>
  );
};

export default Notification;
