import React, { memo, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { Delete, FilterList, Refresh } from "@mui/icons-material";
import { TabContext } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AppTable from "../components/AppTable";
import SearchField from "../components/SearchField";
import {
  clearOrderSearch,
  deleteOrder,
  fetchBranchOrders,
  fetchOrders,
  fetchPendingOrders,
  searchOrders,
} from "../store/reducers/entities/orders";
import { columns } from "../data/orders";
import getDateTime from "../utils/getDateTime";
import useUser from "../customHooks/useUser";
import { subscribe } from "../utils/longPoll";

const Orders = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
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
      dispatch(fetchOrders({ currentPage: 0, status: currentTab }));
    else dispatch(fetchBranchOrders({ currentPage: 0, status: currentTab }));
  };

  const handleChangeTab = (_, value) => {
    setCurrentTab(value);

    if (user.userType === "system")
      dispatch(
        fetchOrders({
          currentPage: 0,
          status: value === 2 ? 4 : value,
        })
      );
    else
      dispatch(
        fetchBranchOrders({
          currentPage: 0,
          status: value === 2 ? 4 : value,
        })
      );
  };

  const handlePageChange = (e, page) => {
    if (user.userType === "system")
      dispatch(fetchOrders({ currentPage: page, pageSize: 25 }));
    else dispatch(fetchBranchOrders({ currentPage: page, pageSize: 25 }));
  };

  const handleSearchOrders = (value, key) => {
    if (key === "Enter" && value.trim()) {
      dispatch(searchOrders({ orderId: value }));
    }
  };

  const handleClearOrderSearch = () => {
    dispatch(clearOrderSearch());
  };

  const handleOpenDeleteDialog = (item) => {
    setCurrentOrderId(item._id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setCurrentOrderId(null);
    setDeleteDialogOpen(false);
  };

  const handleDeleteOrder = () => {
    dispatch(deleteOrder(currentOrderId));
    handleCloseDeleteDialog();
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
        customerName: `${item?.customer?.firstname} ${item?.customer?.lastname}`,
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

  const longPolling = useRef(false);
  useEffect(() => {
    if (!longPolling.current) {
      subscribe(
        `${process.env.REACT_APP_API_URI}/orders/branch/pending?status=0`,
        (count) => dispatch(fetchPendingOrders(count))
      );
      longPolling.current = true;
    }
  }, []);

  const ordersCount = orders.data.totalItemsCount;
  const currentPage = orders.data.currentPage;
  return (
    <Container sx={{ paddingBottom: "2em" }}>
      <Box>
        {renderTitle(orders)}
        {renderSearchToolbar(
          orders,
          handleFetchOrders,
          handleSearchOrders,
          handleClearOrderSearch
        )}

        <Paper
          sx={(theme) => ({
            borderRadius: theme.rounded.medium,
            paddingBottom: "1em",
          })}
          variant="outlined"
        >
          <Grid container justifyContent="space-between">
            <Grid item>{renderTabs(tabs, currentTab, handleChangeTab)}</Grid>
            {/* <Grid item>
              {renderTablePagination({
                count: ordersCount,
                rowsPerPage,
                page: currentPage,
                onPageChange: handlePageChange,
              })}
            </Grid> */}
          </Grid>

          <TabContext value={currentTab.toString()}>
            <Box sx={{ padding: "1.0em" }}>
              <AppTable
                rowKey={"_id"}
                columns={[
                  ...columns,
                  {
                    key: "6",
                    label: null,
                    align: "right",
                    render: (item) => {
                      return (
                        <OrderDeleteButton
                          order={item}
                          onClick={() => handleOpenDeleteDialog(item)}
                        />
                      );
                    },
                  },
                ]}
                data={mapToViewModel(
                  orders.search.data?.items?.length || orders.search.active
                    ? orders.search.data?.items
                    : orders.data.items
                )}
                onRowSelect={handleRowSelect}
                // rowsPerPage={rowsPerPage}
                // count={orders.data.totalItemsCount}
                // page={parseInt(orders.data.currentPage)}
              />
            </Box>
          </TabContext>
        </Paper>
      </Box>

      <Dialog
        open={deleteDialogOpen}
        fullWidth
        maxWidth="xs"
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText variant="subtitle1">
            Are you sure you to permanently want to delete this order?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDeleteDialog}
            size="small"
            variant={"text"}
          >
            No
          </Button>
          <Button onClick={handleDeleteOrder} size="small">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

const renderTitle = (orders) => {
  return (
    <Box>
      <Typography variant="h4">Orders</Typography>
      <Typography variant="subtitle2">
        There are currently {orders.data.items?.length} in total in the database
      </Typography>
    </Box>
  );
};

const renderSearchToolbar = (
  orders,
  handleFetchOrders,
  handleSearchOrders,
  handleClearOrderSearch
) => {
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
              onChange={handleSearchOrders}
              onClear={handleClearOrderSearch}
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
                    backgroundColor:
                      parseInt(orders.pendingCount) === 0
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

const OrderDeleteButton = ({ order, onClick, ...rest }) => {
  const openDialog = (e) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <>
      <IconButton
        disabled={order?.status > 0}
        onClick={openDialog}
        sx={(theme) => ({
          color: theme.palette.error.light,
          opacity: "0.7",
          "&:hover": {
            opacity: "1",
          },
        })}
        {...rest}
      >
        <Delete
          sx={(theme) => ({
            fontSize: "0.72em",
          })}
        />
      </IconButton>
    </>
  );
};

export default Orders;
