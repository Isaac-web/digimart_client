import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  CardMedia,
  Divider,
  ListItemSecondaryAction,
  Button,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const ProductListAccordion = ({ items, title, onRemoveItem }) => {
  return (
    <Accordion
      variant="outlined"
      sx={(theme) => ({
        borderRadius: theme.rounded.large,
        ".MuiAccordion-rounded": {
          backgroundColor: "blue",
        },
      })}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="body1">
          Items Cleared {`(${items.length})`}{" "}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <AccordionContentList items={items} onRemoveItem={onRemoveItem} />
      </AccordionDetails>
    </Accordion>
  );
};

const AccordionContentList = ({ items, onRemoveItem }) => {
  const raiseRemove = (item) => {
    if (typeof onRemoveItem === "function") onRemoveItem(item);
  };
  if (!items?.length) {
    return (
      <Box
        sx={(theme) => ({
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.palette.common.extraLight,
          padding: "3em",
          borderRadius: theme.rounded.medium,
        })}
      >
        <Typography align="center" variant="h6">
          Nothing Added yet
        </Typography>
        <Typography align="center" variant="subtitle1">
          Cleared order items are shown here.
        </Typography>
      </Box>
    );
  }

  return (
    <List>
      {items?.map((i, index) => (
        <Box key={index.toString()}>
          {index !== 0 && (
            <Box sx={{ padding: "0 2em" }}>
              <Divider />
            </Box>
          )}
          <ListItem>
            <ListItemAvatar>
              <CardMedia
                sx={(theme) => ({
                  width: "3em",
                  height: "3em",
                  borderRadius: theme.rounded.small,
                  backgroundColor: theme.palette.common.extraLight,
                })}
                image={i?.imageUri}
              />
            </ListItemAvatar>
            <ListItemText
              primary={i.productName}
              secondary={
                <Typography variant="subtitle2">
                  {i.quantity}, Ghc {i.subtotal}
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <Button
                variant="text"
                size="small"
                onClick={() => raiseRemove(i)}
              >
                Remove
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        </Box>
      ))}
    </List>
  );
};

export default ProductListAccordion;
