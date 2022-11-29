import React, { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import AppTable from "../components/AppTable";
import { tableColumns } from "../data/employees";
import SearchField from "../components/SearchField";
import AppProgress from "../components/AppProgress";
import { loadEmployees } from "../store/reducers/entities/employees";
import { Link, useNavigate } from "react-router-dom";

const Employees = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: employees, loading } = useSelector(
    (state) => state.entities.employees
  );

  useEffect(() => {
    dispatch(loadEmployees());
  }, []);

  const mapToViewModel = (items) => {
    if (items?.length) {
      return items.map((item) => ({
        _id: item._id,
        name: `${item.firstname} ${item.lastname}`,
        email: item.email,
        designation: item.designation.value,
        phone: item.phone,
        imageUri: item.imageUri,
        lastSeen: item.lastSeen,
      }));
    }
  };

  if (loading) return <AppProgress subtitle="Fetching employees data" />;

  return (
    <Container>
      <Box>
        <Typography variant="h4">Employees</Typography>
        <Typography gutterBottom variant="subtitle2">
          Showing {employees?.data?.length} number of employees
        </Typography>
      </Box>

      <Box sx={{ padding: "1em 0" }}>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} md={10}>
            <SearchField placeholder="Search by Name or email address" />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button onClick={() => navigate("/employees/new")}>
              New Employee
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Paper
        sx={{ padding: "1.5em", borderRadius: theme.rounded.medium }}
        variant="outlined"
      >
        <AppTable
          rowKey="_id"
          columns={tableColumns}
          data={mapToViewModel(employees.data)}
        />
      </Paper>
    </Container>
  );
};

export default Employees;
