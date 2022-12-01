import React, { useState, useEffect } from "react";
import {
  Box,
  Chip,
  Menu,
  MenuItem,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Typography,
} from "@mui/material";
import { Done, FilterList } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AppTable from "../components/AppTable";
import SearchField from "../components/SearchField";
import { fetchOrders } from "../store/reducers/entities/orders";
import { columns } from "../data/orders";
import getDateTime from "../utils/getDateTime";

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.entities.orders);

  const handleRowSelect = (item) => {
    navigate(`/orders/${item._id}`);
  };

  useEffect(() => {
    dispatch(fetchOrders());
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
              <Grid item xs={12}>
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
              {/* <Grid item xs={12} md={4}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent={"flex-end"}
                  sx={{ height: "100%" }}
                >
                  <Grid item>
                    <FilterMenu />
                  </Grid>
                </Grid>
              </Grid> */}
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

const FilterMenu = ({ onItemSelect }) => {
  const items = [
    { id: "1", label: "Today's Orders" },
    { id: "2", label: "Pending Orders for the week" },
    { id: "3", label: "Pending orders for the month" },
  ];

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentItem, setcurrentItem] = useState(items[0]);

  const raiseItemSelect = (item) => {
    handleCloseMenu();
    setcurrentItem(item);
    onItemSelect(item);
  };

  const handleOpenMenu = (e) => {
    setOpen(true);
    setAnchorEl(e.target);
  };

  const handleCloseMenu = (e) => {
    setOpen(false);
    setAnchorEl(null);
  };

  return (
    <>
      <Chip
        clickable
        onClick={handleOpenMenu}
        label={currentItem.label}
        deleteIcon={<Done />}
      />
      <Menu
        open={open}
        onClose={handleCloseMenu}
        anchorEl={anchorEl}
        aria-label="Sort Menu"
      >
        {items.map((m) => (
          <MenuItem
            key={m.id}
            sx={{ fontSize: "0.8em" }}
            onClick={() => raiseItemSelect(m)}
          >
            {m.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Orders;
