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
      backgroundColor: "rgba(51, 255, 0, 0.19)",
      color: "white",
      position: "absolute",
      top: "0px",
      left: "0px",
      width: "110%",
    },
    error: {
      backgroundColor: "hsla(0, 100.00%, 50.00%, 0.25)",
      color: "white",
      position: "absolute",
      top: "0px",
      left: "0px",
      width: "110%",
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
