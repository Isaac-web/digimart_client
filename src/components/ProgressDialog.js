import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const ProgressDialog = ({
  open,
  title,
  onClose,
  loaded,
  onDone,
  onCancel,
  done,
  error,
  errorMessage,
}) => {
  const uploading = loaded > 0;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>
        <Grid container justifyContent={"space-between"} alignItems="center">
          <Grid item>
            <Typography variant="h6">{title}</Typography>
          </Grid>

          <Grid item>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        {error ? (
          <Box>
            <Typography align="left" variant="body1" fontWeight={"bold"}>
              Oops... Something went wrong {":("}
            </Typography>
            <Typography align="left" variant="subtitle2">
              Could be issues with your internet connection or the application
              servers
            </Typography>
          </Box>
        ) : (
          <Box>
            <LinearProgress
              value={loaded}
              variant="determinate"
              sx={{ marginBottom: "1em" }}
            />
            {!uploading && (
              <Typography variant="subtitle1">Pending...</Typography>
            )}
            {uploading && (
              <Typography variant="subtitle1">
                Uploaded {Number(loaded).toFixed(0)}%
              </Typography>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button size="small" variant="text" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onDone} size="small" disabled={!done}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProgressDialog;
