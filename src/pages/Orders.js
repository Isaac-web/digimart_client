import React, { useState } from "react";
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
  Toolbar,
  Typography,
} from "@mui/material";
import { Done, FilterList, Sort } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import AppTable from "../components/AppTable";
import SearchField from "../components/SearchField";

const Orders = () => {
  const navigate = useNavigate();

  const items = [
    {
      id: "1",
      orderId: "111222333444",
      date: "1 Jul 2022",
      deliveryDate: "3 Jul 2022",
      itemsCount: "12",
      status: 0,
      total: 150,
    },
    {
      id: "2",
      orderId: "111222333444",
      date: "1 Jul 2022",
      deliveryDate: "3 Jul 2022",
      itemsCount: "12",
      status: 0,
      total: 150,
    },
    {
      id: "3",
      orderId: "111222333444",
      date: "1 Jul 2022",
      deliveryDate: "3 Jul 2022",
      itemsCount: "12",
      status: 0,
      total: 150,
    },
    {
      id: "4",
      orderId: "111222333444",
      date: "1 Jul 2022",
      deliveryDate: "3 Jul 2022",
      itemsCount: "12",
      status: 0,
      total: 150,
    },
  ];

  const columns = [
    {
      key: "1",
      label: "Order id",
      dataIndex: "orderId",
    },
    {
      key: "1",
      label: "Date",
      dataIndex: "date",
    },
    {
      key: "2",
      label: "Delivery Date",
      dataIndex: "deliveryDate",
    },

    {
      key: "4",
      label: "Number Of Items",
      dataIndex: "itemsCount",
    },
    {
      key: "3",
      label: "Status",
      dataIndex: "status",
    },
    {
      key: "3",
      label: "Total",
      dataIndex: "deliveryDate",
    },
  ];

  const handleRowSelect = (item) => {
    navigate(`/orders/${item.id}`);
  };

  return (
    <Container>
      <Box sx={{ padding: "2em 0" }}>
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h4">Orders</Typography>
          <Typography variant="subtitle2">
            There are currently 20 pending orders
          </Typography>
        </Box>
        <Paper sx={{ borderRadius: 2 }}>
          <Toolbar
            sx={{
              padding: "1em 0",
            }}
          >
            <Grid container>
              <Grid item xs={12} md={8}>
                <SearchField
                  placeholder="Search by order Id"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton>
                      <FilterList/>
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
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
              </Grid>
            </Grid>
          </Toolbar>
          <AppTable
            columns={columns}
            data={items}
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
          <MenuItem key={m.id} onClick={() => raiseItemSelect(m)}>
            {m.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Orders;
