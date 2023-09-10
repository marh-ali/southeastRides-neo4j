import React from "react";
import { Snackbar } from "react-native-paper";

const CustomSnackbar = ({ open, handleClose, message, severity }) => {
  return (
    <Snackbar
      visible={open}
      duration={Snackbar.DURATION_SHORT}
      onDismiss={handleClose}
      style={{ backgroundColor: severity === "error" ? "red" : "green" }}
    >
      {message}
    </Snackbar>
  );
};

export default CustomSnackbar;
