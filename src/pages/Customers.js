import React, { useEffect, useRef } from "react";
import { Box, Container, Typography, Grid, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import AppTable from "../components/AppTable";
import { tableColumns } from "../data/customers";
import SearchField from "../components/SearchField";
import {
  clearCustomerSearch,
  fetchCustomers,
  searchCustomers,
} from "../store/reducers/entities/customers";

const Customers = () => {
  const customers = useSelector((state) => state.entities.customers);
  const search = useSelector((state) => state.entities.customers.search);
  const dispatch = useDispatch();

  const mapToViewModel = (data) => {
    if (data.length) {
      return data.map((item) => ({
        name: `${item?.firstname} ${item?.lastname}`,
        image: item?.image?.url,
        phone: item?.phone,
        email: item?.email,
        numberOfOrders: item?.ordersCount || "0",
      }));
    }
  };

  const handleSearch = (value, key) => {
    if (key === "Enter" && value) {
      dispatch(searchCustomers({ name: value }));
    }
  };

  const handleClearSearch = () => {
    dispatch(clearCustomerSearch());
  };

  const apiCalled = useRef(false);
  useEffect(() => {
    if (!apiCalled.current) {
      dispatch(fetchCustomers());
      apiCalled.current = true;
    }
  }, []);

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
            <SearchField
              placeholder="Search Customers by firstname or lastname..."
              loading={search.loading}
              onChange={handleSearch}
              onClear={handleClearSearch}
            />
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
            <AppTable
              loading={customers.loading}
              rowKey="_id"
              columns={tableColumns}
              data={
                mapToViewModel(search.data.items) ||
                mapToViewModel(customers.data.items)
              }
              empty={search.active && !search.data.items.length}
            />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Customers;
