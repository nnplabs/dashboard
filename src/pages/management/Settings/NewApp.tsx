import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React from "react";
import { AppData } from "../../../types/api/app";

export interface SimpleDialogProps {
    open: boolean;
    onClose: () => void;
    onCreate: (appName: string) => void;
  }

function NewApp(props: SimpleDialogProps) {
    const { onClose, open, onCreate } = props;
    const [appName, setAppName] = React.useState("");

  return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {"Create a new app"}
        </DialogTitle>
        <DialogContent>
          <TextField fullWidth variant="outlined" required placeholder="App Name*" value={appName} onChange={(e) => setAppName(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button disabled={appName === ""} onClick={() => onCreate(appName)} autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default NewApp
