import React, { memo, useEffect, useRef, useState } from "react";
import {
  Box,
  Chip,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Tab,
  TablePagination,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { FilterList, Refresh } from "@mui/icons-material";
import { TabContext } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AppTable from "../components/AppTable";
import SearchField from "../components/SearchField";
import {
  fetchBranchOrders,
  fetchOrders,
} from "../store/reducers/entities/orders";
import { columns } from "../data/orders";
import getDateTime from "../utils/getDateTime";
import useUser from "../customHooks/useUser";

const Orders = () => {
  const user = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.entities.orders);
  const [currentTab, setCurrentTab] = useState(0);
  const tabs = [
    { label: "New", Icon: "" },
    { label: "Processing", Icon: "" },
    { label: "Delivered", Icon: "" },
  ];
  const rowsPerPage = 25;

  const handleRowSelect = (item) => {
    navigate(`/orders/${item._id}`);
  };

  const handleFetchOrders = () => {
    if (user.userType === "system")
      dispatch(
        fetchOrders({ currentPage: 0, pageSize: 25, status: currentTab })
      );
    else
      dispatch(
        fetchBranchOrders({ currentPage: 0, pageSize: 25, status: currentTab })
      );
  };

  const handleChangeTab = (_, value) => {
    setCurrentTab(value);

    if (user.userType === "system")
      dispatch(
        fetchOrders({
          currentPage: 0,
          pageSize: 25,
          status: value === 2 ? 4 : value,
        })
      );
    else
      dispatch(
        fetchBranchOrders({
          currentPage: 0,
          pageSize: 25,
          status: value === 2 ? 4 : value,
        })
      );
  };

  const handlePageChange = (e, page) => {
    if (user.userType === "system")
      dispatch(fetchOrders({ currentPage: page, pageSize: 25 }));
    else dispatch(fetchBranchOrders({ currentPage: page, pageSize: 25 }));
  };

  const mapToViewModel = (data) => {
    if (data.length) {
      return data.map((item) => ({
        _id: item._id,
        orderId: item.orderId,
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

  const apiCalled = useRef(false);
  useEffect(() => {
    if (!apiCalled.current) {
      handleFetchOrders();
      apiCalled.current = true;
    }
  }, []);

  const ordersCount = orders.data.totalItemsCount;
  const currentPage = orders.data.currentPage;
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
          <Grid container justifyContent="space-between">
            <Grid item>{renderTabs(tabs, currentTab, handleChangeTab)}</Grid>
            <Grid item>
              {renderTablePagination({
                count: ordersCount,
                rowsPerPage,
                page: currentPage,
                onPageChange: handlePageChange,
              })}
            </Grid>
          </Grid>

          <TabContext value={currentTab.toString()}>
            <Box sx={{ padding: "1.0em" }}>
              <AppTable
                rowKey={"_id"}
                columns={columns}
                data={mapToViewModel(orders.data.items)}
                onRowSelect={handleRowSelect}
                rowsPerPage={rowsPerPage}
                count={orders.data.totalItemsCount}
                page={parseInt(orders.data.currentPage)}
              />
            </Box>
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
        There are currently {orders.data.items?.length} pending orders
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
                  label={`Pending Orders: ${orders.pendingCount}`}
                  sx={(theme) => ({
                    backgroundColor: (parseInt(orders.pendingCount) === 0)
                      ? "rgba(0, 0, 0, 0.1)"
                      : "lightgreen",
                    color: "white",
                  })}
                />
              </Grid>
              <Grid item>
                <Tooltip title="Refresh">
                  <IconButton onClick={handleFetchOrders}>
                    <Refresh />
                  </IconButton>
                </Tooltip>
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

const renderTablePagination = (props) => {
  const { count, rowsPerPage, page, onPageChange } = props;
  // if (!count) throw new Error("count is required.");
  // if (!rowsPerPage) throw new Error("rowsPerPage is required.");
  // if (!page) throw new Error("page is required.");
  // if (!onPageChange) throw new Error("onPageChange be a function");

  return (
    <Toolbar>
      <TablePagination
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        rowsPerPageOptions={[25]}
        onPageChange={onPageChange}
      />
    </Toolbar>
  );
};

export default Orders;
