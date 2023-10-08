import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import * as React from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      // variant="filled"
      {...props}
    />
  );
});

export default function CustomSnackbar({ snackStatus, setsnackStatus }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setsnackStatus(status => {
      return { ...status, isOpen: false };
    });
  };

  return (
    <Stack
      spacing={2}
      sx={{ width: "100%" }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackStatus.isOpen}
        autoHideDuration={3000}
        onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={snackStatus.severity}
          sx={{ width: "100%" }}>
          {snackStatus.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
