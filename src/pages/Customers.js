import React from "react";
import { Box, Container, Typography, Grid, Paper } from "@mui/material";
import { useSelector } from "react-redux";

import AppTable from "../components/AppTable";
import { tableColumns } from "../data/customers";
import SearchField from "../components/SearchField";

const Customers = () => {
  const { data: customers } = useSelector((state) => state.entities.customers);


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
            <AppTable rowKey="_id" columns={tableColumns} data={customers} />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Customers;
