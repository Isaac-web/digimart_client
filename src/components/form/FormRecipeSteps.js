import { useFormikContext } from "formik";
import React from "react";

import RecipeSteps from "../RecipeSteps";

const FormRecipeSteps = ({ name }) => {
  const { values, setFieldValue, touched, errors } = useFormikContext();

  const steps = values[name];
  const handleStepsChange = (newList) => {
    setFieldValue(name, [...newList]);
  };
  return (
    <RecipeSteps
      steps={steps}
      onStepsChange={handleStepsChange}
      errorMessage={touched[name] && errors[name]}
    />
  );
};

export default FormRecipeSteps;
