import React from "react";
import { Grid, Button, CircularProgress } from "@mui/material";
import { useFormikContext } from "formik";

const FormSubmitButton = ({
  xs,
  sm,
  md,
  lg,
  xl,
  children,
  loading,
  ...rest
}) => {
  const { handleSubmit, errors } = useFormikContext();

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <Button
        endIcon={
          loading && (
            <CircularProgress style={{ color: "white" }} size="0.7em" />
          )
        }
        onClick={handleSubmit}
        fullWidth
        {...rest}
      >
        {children}
      </Button>
    </Grid>
  );
};

export default FormSubmitButton;
