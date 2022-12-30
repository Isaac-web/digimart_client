import React from "react";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Dialog,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const CouponDeleteDialog = ({ open, onClose, onConfirm, message }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>
        <Grid container justifyContent={"space-between"} alignItems="center">
          <Grid item>
            <Typography variant="h6">Confirmation</Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>

      <DialogContent>
        <Typography variant="subtitle1">
          {message ||
            "Are you sure you want to permanently delete this coupon?"}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          sx={{ margin: "0 10px" }}
          size="small"
          onClick={onClose}
          variant="text"
        >
          No
        </Button>
        <Button size="small" onClick={onConfirm}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CouponDeleteDialog;
