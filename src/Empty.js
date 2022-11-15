import React from "react";
import { Box, Typography } from "@mui/material";

const Empty = ({ CustomComponent, title, subtitle }) => {
  return (
    <Box
      sx={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>{CustomComponent}</Box>
      <Typography align="center" variant="h5">
        {title}
      </Typography>
      <Typography align="center" variant="subtitle2">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Empty;
