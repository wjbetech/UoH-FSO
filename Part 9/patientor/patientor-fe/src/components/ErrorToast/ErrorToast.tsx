import { Alert, Snackbar } from "@mui/material";
import { ErrorToastProps } from "../../types/types";

export default function ErrorToast({ error, setError }: ErrorToastProps) {
  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setError(null);
  };

  return (
    <Snackbar
      open={!!error}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }} variant="filled">
        {error}
      </Alert>
    </Snackbar>
  );
}
