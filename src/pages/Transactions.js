import React from "react";
import { Container, Box, Typography, useTheme } from "@mui/material";

const Transactions = () => {
  const theme = useTheme();

  return (
    <Container>
      <Box sx={{ padding: "3em", backgroundColor: theme.palette.common.white }}>
        <Typography align="center" variant="h5">
          Coming Soon
        </Typography>
      </Box>
    </Container>
  );
};

export default Transactions;
