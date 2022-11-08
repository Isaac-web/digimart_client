import React from "react";
import { Box, Container, Typography, Grid, Paper } from "@mui/material";

import AppTable from "../components/AppTable";
import { tableColumns, customers } from "../data/customers";

import SearchField from "../components/SearchField";

const Customers = () => {
  return (
    <Container>
      <Box>
        <Typography variant="h4">Customers</Typography>
        <Typography variant="subtitle2" gutterBottom>
          Showing ... customers
        </Typography>
      </Box>

      <Box sx={{ marginBottom: "0.5em" }}>
        <Grid container>
          <Grid item xs={12} lg={8}>
            <SearchField placeholder="Search Customers" />
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Paper
          sx={(theme) => ({
            borderRadius: theme.rounded.medium,
          })}
          variant="outlined"
        >
          <Box sx={{ padding: "1.5em" }}>
            <AppTable columns={tableColumns} data={customers} />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Customers;
