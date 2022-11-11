import React from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";

import AppTable from "../components/AppTable";
import { tableColumns } from "../data/employees";
import SearchField from "../components/SearchField";

const Employees = () => {
  const theme = useTheme();

  const { data: employees } = useSelector((state) => state.entities.employees);

  return (
    <Container>
      <Box>
        <Typography variant="h4">Employees</Typography>
        <Typography gutterBottom variant="subtitle2">
          Showing ... number of employees
        </Typography>
      </Box>

      <Box sx={{ padding: "1em 0" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <SearchField placeholder="Search by Name or email address" />
          </Grid>
          <Grid item xs={12} md={4}>
            Buttons
          </Grid>
        </Grid>
      </Box>

      <Paper
        sx={{ padding: "1.5em", borderRadius: theme.rounded.medium }}
        variant="outlined"
      >
        <AppTable rowKey="_id" columns={tableColumns} data={employees} />
      </Paper>
    </Container>
  );
};

export default Employees;
