import React from "react";
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

import AppTable from "../components/AppTable";
import {
  columns,
  items,
  orderDetails,
  orderSummery,
  orderAddress,
} from "../data/orderDetails";
import RiderPicker from "../components/RiderPicker";
import ProductListAccordion from "../components/ProductListAccordion";

const OrderDetails = () => {
  const theme = useTheme();

  const rider = { name: "Kwame Tom", title: "Rider" };

  return (
    <Container>
      <Box sx={{}}>
        <Box>
          <Typography gutterBottom variant="h4">
            Order Number{" "}
            <Typography
              sx={{ display: "inline", color: theme.palette.secondary.main }}
              variant="inherit"
            >
              #{111222333}
            </Typography>
          </Typography>
        </Box>

        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ width: "100%" }}>
                  <Paper
                    sx={(theme) => ({ borderRadius: theme.rounded.medium })}
                    variant="outlined"
                  >
                    <Box sx={{ padding: "1em 3em" }}>
                      <Typography variant="h6" sx={{ fontWeight: "600" }}>
                        Items Summery
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        padding: "0 1em",
                        paddingBottom: "1em",
                      }}
                    >
                      <AppTable columns={columns} data={items} />

                      <Box sx={{ padding: "1em 0" }}>
                        <ProductListAccordion items={items} />
                      </Box>
                    </Box>
                  </Paper>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ paddingBottom: "1em" }}>
                  <Paper
                    variant="outlined"
                    sx={{ padding: "1em ", borderRadius: theme.rounded.medium }}
                  >
                    <Box sx={{ padding: "0 2em" }}>
                      <Typography variant="h6" sx={{ fontWeight: "600" }}>
                        Customer And Order Details
                      </Typography>
                    </Box>
                    <Box sx={{ padding: 1 }}>
                      <Divider />
                    </Box>

                    <Box>
                      <Grid container>
                        {Object.keys(orderDetails).map((k, index) => (
                          <Grid container>
                            <Grid item container>
                              <Box style={{ padding: 1 }}>
                                <Divider />
                              </Box>
                            </Grid>
                            <Grid
                              item
                              container
                              justifyContent={"space-between"}
                              sx={{ padding: "1em 0" }}
                            >
                              <Grid item>
                                <Typography varaint sx={{ fontWeight: "500" }}>
                                  {orderDetails[k].title}
                                </Typography>
                              </Grid>
                              <Grid item>{orderDetails[k].value}</Grid>
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Paper>
                </Box>
              </Grid>
            </Grid>

            <Grid item xs={12} md={4} container direction="column" spacing={3}>
              <Grid item>
                <RiderPicker
                  rider={rider}
                  onRiderChange={(rider) => console.log(rider)}
                />
              </Grid>

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
                      {orderSummery.map((s) => (
                        <OrderSummeryListItem title={s.title} value={s.value} />
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
                    <OrderSummeryListItem title="Total" value="Ghc125.00" />
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
                        {orderAddress.map((item) => (
                          <OrderSummeryListItem
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
                  <Button fullWidth endIcon={<Send size="small" />}>
                    Dispatch Order
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
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
        <Typography variant="subtitle2">
          <Typography variant="subtitle2">{value}</Typography>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default OrderDetails;
