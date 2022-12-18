import { ConstructionOutlined, DeleteOutline } from "@mui/icons-material";
import {
  Container,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const RecipeSteps = ({ steps, onStepsChange, errorMessage, ...rest }) => {
  const handleDelete = (item) => {
    const newList = steps.filter((s) => s.text !== item.text);
    onStepsChange(newList);
  };

  const raiseAddStep = ({ key, target: input }) => {
    if (key === "Enter" && input.value.trim()) {
      if (typeof onStepsChange === "function") {
        const step_found = steps.findIndex(item => item.text ===  input.value.trim())
  
        console.log(step_found)
        onStepsChange([...steps, { text: input.value }]);
        input.value = "".trim();
      }
    }
  };

  return (
    <>
      <TextField
        multiline
        maxRows={2}
        fullWidth
        onKeyPress={raiseAddStep}
        helperText={errorMessage || "Input the step and hit return..."}
        error={errorMessage ? true : false}
        label={"Step"}
        {...rest}
      />
      <Container maxWidth="md">
        {steps.length ? (
          <List>
            {steps.map((item, index) => (
              <StepListItem
                key={index.toString()}
                stepNumber={index + 1}
                title={item.text}
                onDelete={() => handleDelete(item)}
              />
            ))}
          </List>
        ) : (
          <Box sx={{ padding: "3em" }}>
            <Typography align="center" variant="h6">
              No Procedure Added
            </Typography>
            <Typography align="center" variant="subtitle2">
              Please add procedures for the recipe
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
};

const StepListItem = ({ stepNumber, title, onDelete }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Box
          sx={(theme) => ({
            height: "2.2em",
            width: "2.2em",
            color: theme.palette.common.white,
            backgroundColor: theme.palette.success.light,
            borderRadius: "1.5em",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "0.6em",
          })}
        >
          {stepNumber}
        </Box>
      </ListItemAvatar>
      <ListItemText>{title}</ListItemText>
      <ListItemSecondaryAction>
        <IconButton onClick={onDelete}>
          <DeleteOutline
            sx={(theme) => ({
              fontSize: "0.7em",
              color: theme.palette.error.light,
            })}
          />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default RecipeSteps;
