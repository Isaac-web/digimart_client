import React, { memo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Button,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";

import Form from "./form/Form";
import FormTextField from "./form/FormTextField";
import FormSubmitButton from "./form/FormSubmitButton";
import FormSwitch from "./form/FormSwitch";
import FormDatePicker from "./form/FormDatePicker";
import * as Yup from "yup";
import { Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { createCoupon } from "../store/reducers/entities/coupons";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().max(100).label("Coupon Name"),
  description: Yup.string().optional().min(0).max(500).label("Description"),
  amount: Yup.number().moreThan(0).required().label("Amount"),
  limit: Yup.number().moreThan(0).required().label("Limit"),
  active: Yup.boolean(),
  expiresAt: Yup.date("Expiry Date should be a valid date.")
    .required("Expiry Date is a required.")
    .label("Expiry Date"),
});

const NewCouponDialog = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const coupons = useSelector((state) => state.entities.coupons);

  const handleSubmit = (data, { resetForm }) => {
    data.expiresAt = data.expiresAt.toString();
    dispatch(
      createCoupon(data, () => {
        onClose();
        resetForm();
      })
    );
  };

  return (
    <Form
      initialValues={{
        name: "",
        description: "",
        amount: 0,
        active: true,
        expiresAt: null,
        limit: 0,
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <Grid container justifyContent={"space-between"} alignItems="center">
            <Grid item>New Coupon</Grid>
            <Grid item>
              <IconButton onClick={onClose}>
                <Close />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <FormTextField autoFocus name="name" label="Name" xs={12} />
            <FormTextField
              InputProps={{
                startAdornment: (
                  <InputAdornment sx={{ marginRight: "5px" }} position="start">
                    <Typography variant="subtitle2">Ghc </Typography>
                  </InputAdornment>
                ),
              }}
              name="amount"
              label="Amount"
            />
            <FormTextField name="limit" label="Limit" />
            <FormTextField
              name="description"
              label="Description"
              multiline
              rows={3}
              xs={12}
            />
            <FormDatePicker name={"expiresAt"} label="Expiry Date" />

            <Grid item sx={{ width: "50%" }}>
              <Grid container justifyContent={"flex-end"} alignItems="flex-end">
                <FormSwitch name={"active"} label="Active" />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            size="small"
            sx={{ margin: "0 10px" }}
            variant="text"
          >
            Cancel
          </Button>
          <FormSubmitButton loading={coupons?.posting} size="small">
            Save
          </FormSubmitButton>
        </DialogActions>
      </Dialog>
    </Form>
  );
};

export default memo(NewCouponDialog);
