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
  Chip,
} from "@mui/material";
import { Receipt, Send } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import AppTable from "../components/AppTable";
import {
  columns,
  getOrderAddress,
  getOrderSummery,
  orderAddress,
} from "../data/orderDetails";
import RiderPicker from "../components/RiderPicker";
import ProductListAccordion from "../components/ProductListAccordion";
import {
  dispatchOrder,
  fetchOrder,
  setRider,
  unclearOrderItem,
  updateOnOpen,
} from "../store/reducers/details/order";
import { useNavigate, useParams } from "react-router-dom";
import AppProgress from "../components/AppProgress";
import StatusIndicator from "../components/StatusIndicator";

const OrderDetails = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id: orderId } = useParams();
  const order = useSelector((state) => state.details.order);
  const navigate = useNavigate();

  const orderSummery = [
    { id: "1", title: "Order Created", value: "Sun May 7, 2022" },
    { id: "2", title: "Order Time", value: "06:24 AM" },
    { id: "3", title: "Sub Total", value: 120 },
    { id: "4", title: "Delivery Fee", value: order?.deliveryFee },
  ];

  const mapToItemsTable = (data) => {
    if (data?.order_items?.length) {
      const items = data.order_items.map((item) => ({
        _id: item.product,
        productName: item.productName,
        unitPrice: item.unitPrice,
        imageUri: item.imageUri,
        subtotal: item.subtotal,
        quantity: item.quantity,
      }));

      return items;
    } else return [];
  };

  const mapToRider = (rider) => {
    if (rider) return { name: rider.name, title: rider.designation };
    else return null;
  };

  const rider = mapToRider(order.data?.rider);

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
        // { title: "Delivery Date", value: "1st Dec, 2022" },
        { title: "Note", value: order?.comment },
      ];
    }
  };

  const handleRiderSelect = (rider) => {
    dispatch(setRider(rider));
  };

  const apiCalled = useRef(false);
  useEffect(() => {
    if (!apiCalled.current) {
      dispatch(fetchOrder(orderId));
      dispatch(updateOnOpen(orderId));
      apiCalled.current = true;
    }
  }, []);

  const handleDispatch = () => {
    const data = {
      riderId: order.data.rider._id,
      orderId,
    };
    dispatch(dispatchOrder(data, () => navigate("/orders")));
  };

  if (order.loading) return <AppProgress subtitle="Fetching order data..." />;

  return (
    <Container sx={{ padding: "2em" }}>
      <Box>
        <Typography gutterBottom variant="h6" fontWeight={"bold"}>
          Order Id: *************
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
                  <Typography variant="h5">Items Summery</Typography>
                </Box>
                <Box sx={{ marginBottom: 1 }}>
                  <AppTable
                    columns={columns}
                    data={mapToItemsTable(order?.data)}
                    rowKey="_id"
                  />
                </Box>

                <Box>
                  <ProductListAccordion
                    items={order?.clearedItems}
                    onRemoveItem={(item) => dispatch(unclearOrderItem(item))}
                    title="Cleared"
                  />
                </Box>
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
                      <OrderSummeryListItem
                        title={item.title}
                        value={item.value}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Left side of screen */}
          <Grid item xs={12} md={4}>
            <Grid container direction="column" spacing={3}>
              {/* Rider Picker */}
              <Grid item>
                <RiderPicker rider={rider} onRiderChange={handleRiderSelect} />
              </Grid>

              {/* Order Summery */}
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
                        <Typography variant="h6">Order Summery</Typography>
                      </Grid>
                      <Grid item>
                        <StatusIndicator
                          value={order?.data?.status?.value}
                          loading={order.updatingStatus}
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                      {getOrderSummery(order?.data).map((s, index) => (
                        <OrderSummeryListItem
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
                    <OrderSummeryListItem
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
                          <OrderSummeryListItem
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
                    onClick={handleDispatch}
                    fullWidth
                    endIcon={<Send size="small" />}
                    disabled={!order.data.rider}
                  >
                    Dispatch Order
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

const OrderSummeryListItem = ({ title, value }) => {
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
