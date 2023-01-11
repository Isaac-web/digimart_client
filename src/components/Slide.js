import { DeleteOutline } from "@mui/icons-material";
import { Box, CardMedia, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";

const Slide = ({ fullWidth, subtitle, title, onDelete, imageUrl }) => {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <Box
      sx={(theme) => ({
        width: `${fullWidth ? "100%" : "18em"}`,
        height: "9em",
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.2))",
        borderRadius: theme.spacing(1),
        overflow: "hidden",
        position: "relative",
      })}
      onMouseOver={() => {
        setShowDelete(true);
      }}
      onMouseLeave={() => {
        setShowDelete(false);
      }}
    >
      {showDelete && (
        <IconButton
          sx={(theme) => ({
            position: "absolute",
            right: "0.2em",
            top: "0.1em",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: theme.palette.common.white,
            "&:hover": {
              backgroundColor: theme.palette.error.main,
              //   backgroundColor: "red",
            },
          })}
          onClick={onDelete}
        >
          <DeleteOutline sx={{ fontSize: "0.8em" }} />
        </IconButton>
      )}
      <CardMedia image={imageUrl} sx={{ width: "100%", height: "100%" }} />
      {subtitle && (
        <Box
          sx={(theme) => ({
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            position: "absolute",
            padding: "0 0.7em",
            top: "0.5em",
            left: "0.5em",
            borderRadius: theme.spacing(1),
          })}
        >
          <Typography
            sx={(theme) => ({
              fontSize: "0.9em",
              display: "inline-block",
              color: theme.palette.common.white,
            })}
            variant="subtitle1"
          >
            {subtitle}
          </Typography>
        </Box>
      )}

      {title && (
        <Box
          sx={(theme) => ({
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            padding: theme.spacing(1),
            position: "absolute",
            bottom: "0.5em",
            left: "0.5em",
            borderRadius: theme.spacing(1),
          })}
        >
          <Typography
            sx={(theme) => ({
              display: "inline-block",
              color: theme.palette.common.white,
            })}
            variant="body1"
            fontWeight={"bold"}
          >
            {title}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Slide;
