import React from "react";
import { Grid, Button } from "@mui/material";
import { useFormikContext } from "formik";

const FormSubmitButton = ({ xs, sm, md, lg, xl, children, ...rest }) => {
  const { handleSubmit, errors } = useFormikContext();

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <Button onClick={handleSubmit} fullWidth {...rest}>
        {children}
      </Button>
    </Grid>
  );
};

export default FormSubmitButton;
