import React, { useEffect, useState } from "react";
import {
  Box,
  Chip,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { FilterList, Refresh } from "@mui/icons-material";
import { TabContext, TabPanel } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AppTable from "../components/AppTable";
import SearchField from "../components/SearchField";
import { fetchBranchOrders } from "../store/reducers/entities/orders";
import { columns } from "../data/orders";
import getDateTime from "../utils/getDateTime";

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.entities.orders);
  const [currentPage, setCurrentPage] = useState(0);

  const [currentTab, setCurrentTab] = useState(0);
  const tabs = [
    { label: "New", Icon: "" },
    { label: "Processing", Icon: "" },
    { label: "Dispatched", Icon: "" },
    { label: "Delivered", Icon: "" },
  ];

  const handleRowSelect = (item) => {
    navigate(`/orders/${item._id}`);
  };

  const handleFetchOrders = () => {
    dispatch(fetchBranchOrders());
  };

  const handleChangeTab = (e, value) => {
    setCurrentTab(value);
  };

  const handlePageChange = (page, direction) => {
    if (direction === "prev")  {
      if (currentPage != 0) setCurrentPage(currentPage - 1);
    } else setCurrentPage(currentPage + 1);
    dispatch(fetchBranchOrders({ currentPage }));
  };

  // console.log(currentPage);

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

  useEffect(() => {
    handleFetchOrders();
  }, []);

  return (
    <Container sx={{ paddingBottom: "2em" }}>
      <Box>
        {renderTitle(orders)}
        {renderSearchToolbar(orders, handleFetchOrders)}

        <Paper
          sx={(theme) => ({
            borderRadius: theme.rounded.medium,
            paddingBottom: "1em",
          })}
          variant="outlined"
        >
          {renderTabs(tabs, currentTab, handleChangeTab)}
          <TabContext value={currentTab}>
            <TabPanel value={0}>
              <AppTable
                rowKey={"_id"}
                columns={columns}
                data={mapToViewModel(orders.data.items)}
                onRowSelect={handleRowSelect}
                rowsPerPage={orders.data.pageSize}
                count={orders.data.totalItemsCount}
                page={parseInt(orders.data.currentPage)}
                onPageChange={handlePageChange}
              />
            </TabPanel>
            <TabPanel value={1}>One</TabPanel>
            <TabPanel value={2}>Two</TabPanel>
            <TabPanel value={3}>Three</TabPanel>
          </TabContext>
        </Paper>
      </Box>
    </Container>
  );
};

const renderTitle = (orders) => {
  return (
    <Box>
      <Typography variant="h4">Orders</Typography>
      <Typography variant="subtitle2">
        There are currently {orders.data.items.length} pending orders
      </Typography>
    </Box>
  );
};

const renderSearchToolbar = (orders, handleFetchOrders) => {
  return (
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
  );
};

const renderTabs = (tabs, currentTab, handleChangeTab) => {
  return (
    <Toolbar
      sx={{
        height: "2em",
        marginBottom: "-1em",
      }}
    >
      <Tabs value={currentTab} onChange={handleChangeTab}>
        {tabs.map((t, index) => (
          <Tab
            label={t.label}
            key={index.toString()}
            sx={{ textTransform: "none" }}
          />
        ))}
      </Tabs>
    </Toolbar>
  );
};

export default Orders;
