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
  items,
  orderSummery,
  orderAddress,
} from "../data/orderDetails";
import RiderPicker from "../components/RiderPicker";
import ProductListAccordion from "../components/ProductListAccordion";
import {
  fetchOrder,
  setRider,
  unclearOrderItem,
} from "../store/reducers/details/order";
import { useParams } from "react-router-dom";
import AppProgress from "../components/AppProgress";

const OrderDetails = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id: orderId } = useParams();
  const order = useSelector((state) => state.details.order);

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
  const rider = { name: "Kwame Tom", title: "Rider" };

  const mapToDetailsList = (order) => {
    if (order) {
      return [
        {
          title: "Customer Name",
          value: `${order?.customer?.firstname} ${order?.customer?.lastname}`,
        },
        { title: "Phone Number", value: order.customer?.phone },
        { title: "Payment method", value: "Cash" },
        { title: "Delivery Date", value: "1st Dec, 2022" },
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

      apiCalled.current = true;
    }
  }, []);

  
  const handleDispatch = () => {
      console.log(order);
  }

  if (order.loading) return null;

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
                        <Chip
                          color="primary"
                          label="On the Way"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                      {orderSummery.map((s, index) => (
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
                        {orderAddress.map((item, index) => (
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
                  <Button onClick={handleDispatch} fullWidth endIcon={<Send size="small" />}>
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

// const OrderDetails = () => {
//   const theme = useTheme();
//   const dispatch = useDispatch();
//   const { id: orderId } = useParams();

//   const order = useSelector((state) => state.details.order);
//   console.log(order);

//   const rider = { name: "Kwame Tom", title: "Rider" };

//   const apiCalled = useRef(false);

//   const mapToDetails = (order) => {
//     if (order) {
//       return [
//         {
//           title: "Customer Name",
//           value: `${order?.customer?.firstname} ${order?.customer?.lastname}`,
//         },
//         { title: "Phone Number", value: order.customer?.phone },
//         { title: "Payment method", value: "Cash" },
//         { title: "Delivery Date", value: "1st Dec, 2022" },
//         { title: "Note", value: order?.comment },
//       ];
//     }
//   };

//   if (order.loading) return <AppProgress subtitle="Fetching order data..." />;

//   return (
//     <Container>

//         <Box>
//

//               <Grid item xs={12}>
//                 <Box sx={{ paddingBottom: "1em" }}>
//                   <Paper
//                     variant="outlined"
//                     sx={{ padding: "1em ", borderRadius: theme.rounded.medium }}
//                   >
//                     <Box sx={{ padding: "0 2em" }}>
//                       <Typography variant="h6" sx={{ fontWeight: "600" }}>
//                         Customer And Order Details
//                       </Typography>
//                     </Box>
//                     <Box sx={{ padding: 1 }}>
//                       <Divider />
//                     </Box>

//                     <Box>
//                       <Grid container>
//                         {mapToDetails(order.data).map((k, index) => (
//                           <Grid container key={index.toString()}>
//                             <Grid item container>
//                               <Box style={{ padding: 1 }}>
//                                 <Divider />
//                               </Box>
//                             </Grid>
//                             <Grid
//                               item
//                               container
//                               justifyContent={"space-between"}
//                               sx={{ padding: "1em 0" }}
//                             >
//                               <Grid item>
//                                 <Typography varaint sx={{ fontWeight: "500" }}>
//                                   {k?.title}
//                                 </Typography>
//                               </Grid>
//                               <Grid item>{k?.value}</Grid>
//                             </Grid>
//                           </Grid>
//                         ))}
//                       </Grid>
//                     </Box>
//                   </Paper>
//                 </Box>
//               </Grid>
//             </Grid>

//             <Grid item xs={12} md={4} container direction="column" spacing={3}>
//               <Grid item>
//                 <RiderPicker
//                   rider={rider}
//                   onRiderChange={(rider) => console.log(rider)}
//                 />
//               </Grid>

//               <Grid item>
//                 <Paper
//                   variant="outlined"
//                   sx={{ borderRadius: theme.rounded.medium }}
//                 >
//                   <Box sx={{ padding: "1.5em" }}>
//                     <Grid
//                       container
//                       justifyContent={"space-between"}
//                       alignItems="center"
//                       sx={{ marginBottom: "2em" }}
//                     >
//                       <Grid item>
//                         <Typography variant="h6">Order Summery</Typography>
//                       </Grid>
//                       <Grid item>
//                         <Chip
//                           color="primary"
//                           label="On the Way"
//                           variant="outlined"
//                         />
//                       </Grid>
//                     </Grid>

//                     <Grid container spacing={2}>
//                       {orderSummery.map((s) => (
//                         <OrderSummeryListItem title={s.title} value={s.value} />
//                       ))}
//                     </Grid>
//                   </Box>
//                 </Paper>
//               </Grid>

//               <Grid item>
//                 <Paper
//                   variant="outlined"
//                   sx={{ borderRadius: theme.rounded.medium }}
//                 >
//                   <Box sx={{ padding: "1.5em" }}>
//                     <OrderSummeryListItem title="Total" value="Ghc125.00" />
//                   </Box>
//                 </Paper>
//               </Grid>

//               <Grid item>
//                 <Paper
//                   variant="outlined"
//                   sx={{ borderRadius: theme.rounded.medium }}
//                 >
//                   <Box sx={{ padding: "1.5em" }}>
//                     <Box sx={{ marginBottom: "1.5em" }}>
//                       <Typography variant="h6">Delivery Address</Typography>
//                     </Box>
//                     <Box>
//                       <Grid container>
//                         {orderAddress.map((item) => (
//                           <OrderSummeryListItem
//                             title={item.title}
//                             value={item.value}
//                           />
//                         ))}
//                       </Grid>
//                     </Box>
//                   </Box>
//                 </Paper>
//               </Grid>

//               <Grid item container spacing={3}>
//                 <Grid item xs={6}>
//                   <Button
//                     startIcon={<Receipt />}
//                     variant="outlined"
//                     fullWidth
//                     disabled
//                   >
//                     Print Invoice
//                   </Button>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Button fullWidth endIcon={<Send size="small" />}>
//                     Dispatch Order
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

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
