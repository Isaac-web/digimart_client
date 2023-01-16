import React, { useEffect, useRef } from "react";
import {
  Button,
  Divider,
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  useTheme,
} from "@mui/material";
import { Receipt, Send } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import AppTable from "../components/AppTable";
import {
  columns,
  getOrderAddress,
  getOrderSummary,
} from "../data/orderDetails";
import EmployeePicker from "../components/EmployeePicker";
import ProductListAccordion from "../components/ProductListAccordion";
import {
  clearOrder,
  fetchOrder,
  setRider,
  setShopper,
  unclearOrderItem,
  updateOrder,
} from "../store/reducers/details/order";
import { useNavigate, useParams } from "react-router-dom";
import AppProgress from "../components/AppProgress";
import StatusIndicator from "../components/StatusIndicator";
import { fetchDesignations } from "../store/reducers/entities/designations";

const OrderDetails = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id: orderId } = useParams();
  const order = useSelector((state) => state.details.order);
  const designations = useSelector((state) => state.entities.designations);
  const navigate = useNavigate();

  const mapToItemsTable = (data) => {
    if (data?.order_items?.length) {
      const items = data.order_items.map((item) => ({
        _id: item.productId,
        productName: item.productName,
        unitPrice: item.unitPrice,
        imageUri: item.imageUri,
        subtotal: item.subtotal,
        quantity: item.quantity,
      }));

      return items;
    } else return [];
  };

  const mapToEmployee = (employee) => {
    if (employee)
      return {
        name: `${employee?.firstname} ${employee?.lastname}`,
        title: employee?.designation,
      };
    else return null;
  };

  const mapToDetailsList = (order) => {
    if (order) {
      return [
        {
          title: "Customer Name",
          value: `${order?.customer?.firstname} ${order?.customer?.lastname}`,
        },
        { title: "Phone Number", value: order.customer?.phone },
        {
          title: "Payment method",
          value: order?.payment_method?.name || "Cash",
        },
        // { title: `${order?.comment ? "Note" : ""} `, value: order?.comment },
      ];
    }
  };

  const handleRiderSelect = (rider) => {
    dispatch(setRider(rider));
  };

  const handleShopperSelect = (shopper) => {
    dispatch(setShopper(shopper));
  };

  const getDesignationId = (designations, value) => {
    if (designations) {
      const results = designations?.filter((d) => d.value === value);

      if (results) return results[0]?._id;
      else return null;
    }
  };

  const handleUpdateOrder = () => {
    const data = {
      shopperId: order.data.shopper._id,
      riderId: order.data.rider._id,
    };

    dispatch(updateOrder(orderId, data, () => navigate("/orders")));
  };

  const apiCalled = useRef(false);
  useEffect(() => {
    if (!apiCalled.current) {
      dispatch(fetchOrder(orderId));
      dispatch(fetchDesignations());
      apiCalled.current = true;
    }

    return () => {
      dispatch(clearOrder());
    };
  }, []);

  if (order.loading) return <AppProgress subtitle="Fetching order data..." />;

  return (
    <Container sx={{ padding: "2em" }}>
      <Box>
        <Typography gutterBottom variant="h6" fontWeight={"bold"}>
          Order Id: {order.data.orderId}
        </Typography>
      </Box>

      <Box>
        <Grid container spacing={3}>
          {/* Right side of screen */}
          <Grid item xs={12} md={8}>
            <Paper
              sx={(theme) => ({
                borderRadius: theme.rounded.medium,
                marginBottom: "1.5em",
              })}
              variant="outlined"
            >
              <Box sx={{ padding: "1.5em" }}>
                <Box sx={{ padding: "1em" }}>
                  <Typography variant="h5">Items Summary</Typography>
                </Box>
                <Box sx={{ marginBottom: 1 }}>
                  <AppTable
                    columns={columns}
                    data={mapToItemsTable(order?.data)}
                    rowKey="_id"
                  />
                </Box>

                {/* <Box>
                  <ProductListAccordion
                    items={order?.clearedItems}
                    onRemoveItem={(item) => dispatch(unclearOrderItem(item))}
                    title="Cleared"
                  />
                </Box> */}
              </Box>
            </Paper>

            <Paper
              variant="outlined"
              sx={(theme) => ({
                borderRadius: theme.rounded.medium,
              })}
            >
              <Box sx={{ padding: "1.5em" }}>
                <Box>
                  <Typography variant="h5">Additional Info</Typography>
                </Box>

                <Box sx={{ padding: "1em" }}>
                  <Divider />
                </Box>

                <Box>
                  {mapToDetailsList(order.data)?.map((item, index) => (
                    <Box key={index.toString()} sx={{ marginBottom: "2em" }}>
                      <OrderSummaryListItem
                        title={item.title}
                        value={item.value}
                      />
                    </Box>
                  ))}

                  {order?.data?.comment && (
                    <Box
                      item
                      container
                      sx={(theme) => ({
                        backgroundColor: theme.palette.common.extraLight,
                        padding: "1em",
                        borderRadius: theme.rounded.small,
                      })}
                    >
                      <Typography variant="body2" fontWeight="bold">
                        Note
                      </Typography>
                      <Box>{order?.data?.comment || "Hello World"}</Box>
                    </Box>
                  )}
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Left side of screen */}
          <Grid item xs={12} md={4}>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <EmployeePicker
                  employee={mapToEmployee(order.data?.shopper)}
                  emptyContentTitle="Search Shoppers"
                  onEmployeeChange={handleShopperSelect}
                  placeholder="Search shoppers..."
                  designationId={getDesignationId(designations.data, "shopper")}
                  title="Shopper Details"
                  text="Shopper for this order is not set."
                  pickEmployeeButtonTitle={"Pick a shopper"}
                  changeEmployeeButtonTitle={"Change shopper"}
                  showSubtitle={!order?.data?.status?.value}
                  disabled={order?.data?.status?.value > 0}
                />
              </Grid>

              <Grid item>
                <EmployeePicker
                  employee={mapToEmployee(order.data?.rider)}
                  emptyContentTitle="Search Riders"
                  emptyContentSubTitle={"Subtitle"}
                  onEmployeeChange={handleRiderSelect}
                  placeholder="Search riders..."
                  designationId={getDesignationId(designations.data, "rider")}
                  title="Rider Details"
                  text="Rider for this order is not set."
                  pickEmployeeButtonTitle={"Pick a rider"}
                  changeEmployeeButtonTitle={"Change rider"}
                  showSubtitle={!order?.data?.status?.value}
                  disabled={order?.data?.status?.value > 0}
                />
              </Grid>

              {/* Order Summary */}
              <Grid item>
                <Paper
                  variant="outlined"
                  sx={{ borderRadius: theme.rounded.medium }}
                >
                  <Box sx={{ padding: "1.5em" }}>
                    <Grid
                      container
                      justifyContent={"space-between"}
                      alignItems="center"
                      sx={{ marginBottom: "2em" }}
                    >
                      <Grid item>
                        <Typography variant="h6">Order Summary</Typography>
                      </Grid>
                      <Grid item>
                        <StatusIndicator
                          value={order?.data?.status?.value}
                          loading={order.updatingStatus}
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                      {getOrderSummary(order?.data).map((s, index) => (
                        <OrderSummaryListItem
                          key={index.toString()}
                          title={s.title}
                          value={s.value}
                        />
                      ))}
                    </Grid>
                  </Box>
                </Paper>
              </Grid>

              <Grid item>
                <Paper
                  variant="outlined"
                  sx={{ borderRadius: theme.rounded.medium }}
                >
                  <Box sx={{ padding: "1.5em" }}>
                    <OrderSummaryListItem
                      title="Total"
                      value={`Ghc ${order?.data?.total?.toFixed(2)}`}
                    />
                  </Box>
                </Paper>
              </Grid>

              <Grid item>
                <Paper
                  variant="outlined"
                  sx={{ borderRadius: theme.rounded.medium }}
                >
                  <Box sx={{ padding: "1.5em" }}>
                    <Box sx={{ marginBottom: "1.5em" }}>
                      <Typography variant="h6">Delivery Address</Typography>
                    </Box>
                    <Box>
                      <Grid container>
                        {getOrderAddress(order.data).map((item, index) => (
                          <OrderSummaryListItem
                            key={index.toString()}
                            title={item.title}
                            value={item.value}
                          />
                        ))}
                      </Grid>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              <Grid item container spacing={3}>
                <Grid item xs={6}>
                  <Button
                    startIcon={<Receipt />}
                    variant="outlined"
                    fullWidth
                    disabled
                  >
                    Print Invoice
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    onClick={handleUpdateOrder}
                    fullWidth
                    endIcon={<Send size="small" />}
                    disabled={
                      !order.data.shopper ||
                      !order.data.rider ||
                      order?.data?.status?.value >= 1
                    }
                  >
                    {order.data.status?.value === 0
                      ? "Update Order"
                      : "Dispatch Order"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

const OrderSummaryListItem = ({ title, value }) => {
  return (
    <Grid item container justifyContent={"space-between"}>
      <Grid item>
        <Typography variant="subtitle2" fontWeight={"600"}>
          {title}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle2">{value}</Typography>
      </Grid>
    </Grid>
  );
};



export default OrderDetails;
