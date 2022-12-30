import React from "react";
import { Formik } from "formik";

const Form = ({
  children,
  initialValues,
  onReset,
  onSubmit,
  validationSchema,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      onReset={onReset}
    >
      {() => <>{children}</>}
    </Formik>
  );
};

export default Form;
