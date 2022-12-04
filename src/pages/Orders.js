import React, { useEffect } from "react";
import {
  Box,
  Chip,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Typography,
} from "@mui/material";
import { FilterList, Refresh } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AppTable from "../components/AppTable";
import SearchField from "../components/SearchField";
import {
  fetchBranchOrders,
} from "../store/reducers/entities/orders";
import { columns } from "../data/orders";
import getDateTime from "../utils/getDateTime";

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.entities.orders);

  const handleRowSelect = (item) => {
    navigate(`/orders/${item._id}`);
  };

  const handleFetchOrders = () => {
    dispatch(fetchBranchOrders());
  };

  useEffect(() => {
    handleFetchOrders();
   
  }, []);

  const mapToViewModel = (data) => {
    if (data.length) {
      return data.map((item) => ({
        _id: item._id,
        orderId: item._id,
        status: item.status.value,
        itemsCount: item.order_items.length,
        total: `Ghc${item.total?.toFixed(2)}`,
        date: getDateTime(new Date(item.createdAt)).dateString,
        deliveryDate: "N/A",
      }));
    } else {
      return [];
    }
  };

  return (
    <Container sx={{ paddingBottom: "2em" }}>
      <Box>
        <Box>
          <Typography variant="h4">Orders</Typography>
          <Typography variant="subtitle2" gutterBottom>
            There are currently {orders.data.length} pending orders
          </Typography>
        </Box>

        <Box>
          <Box
            sx={{
              padding: "1em 0",
              margin: "0",
            }}
          >
            <Grid container>
              <Grid item xs={12} md={10} lg={9}>
                <SearchField
                  placeholder="Search by order Id"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton>
                        <FilterList />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Grid>
              <Grid item xs={12} md={2} lg={3}>
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  justifyContent={"flex-end"}
                  sx={{ height: "100%" }}
                >
                  <Grid item>
                    <Chip
                      label={`${orders.pendingCount || "No"} Pending Orders`}
                      sx={(theme) => ({
                        backgroundColor: !orders.pendingCount
                          ? "rgba(0, 0, 0, 0.1)"
                          : "lightgreen",
                        color: "white",
                      })}
                    />
                  </Grid>
                  <Grid item>
                    <IconButton onClick={handleFetchOrders}>
                      <Refresh />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Paper
          sx={(theme) => ({
            borderRadius: theme.rounded.medium,
            padding: "1.5em",
            paddingBottom: "1em",
          })}
          variant="outlined"
        >
          <AppTable
            rowKey={"_id"}
            columns={columns}
            data={mapToViewModel(orders.data)}
            onRowSelect={handleRowSelect}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default Orders;
