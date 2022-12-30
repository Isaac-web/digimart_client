import React, { memo, useState, useEffect, useRef } from "react";
import { Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { Delete } from "@mui/icons-material";

import AppProgress from "./AppProgress";
import AppTable from "./AppTable";
import NewCouponDialog from "./NewCouponDialog";
import { deleteCoupon, fetchCoupons } from "../store/reducers/entities/coupons";
import getDateTime from "../utils/getDateTime";
import CouponDeleteDialog from "./CouponDeleteDialog";
import Empty from "../Empty";

const Coupons = () => {
  const dispatch = useDispatch();
  const [couponDialogOpen, setCouponDialogOpen] = useState(false);

  const coupons = useSelector((state) => state.entities.coupons);

  const handleOpenDialog = () => {
    setCouponDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setCouponDialogOpen(false);
  };

  const apiCalled = useRef(false);
  useEffect(() => {
    if (!apiCalled.current) {
      dispatch(fetchCoupons());
      apiCalled.current = true;
    }
  }, []);

  return (
    <>
      <Box>
        <Paper sx={{ padding: "1em" }}>
          <Grid container>
            <Grid item container justifyContent="space-between">
              <Grid item>
                <Typography variant="h5" gutterBottom>
                  Coupons
                </Typography>
              </Grid>
              <Grid item>
                <Button size="small" onClick={handleOpenDialog}>
                  New Coupon
                </Button>
              </Grid>
            </Grid>
            {coupons.loading ? (
              <AppProgress size={"0.9em"} />
            ) : (
              <Grid item xs={12}>
                <CouponsTable items={coupons.data.items} />
              </Grid>
            )}
          </Grid>
        </Paper>
      </Box>
      <NewCouponDialog open={couponDialogOpen} onClose={handleCloseDialog} />
    </>
  );
};

const CouponsTable = ({ items }) => {
  const dispatch = useDispatch();
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const columns = [
    {
      key: "1",
      label: "Name",
      dataIndex: "name",
    },
    {
      key: "2",
      align: "center",
      label: "Code",
      dataIndex: "code",
    },
    {
      align: "center",
      key: "3",
      label: "Discount Amount",
      dataIndex: "amount",
      render: (item) => `Ghc ${item.amount?.toFixed(2)}`,
    },
    {
      align: "center",
      key: "4",
      label: "Expires At",
      dataIndex: "expiresAt",
      render: (item) => `${getDateTime(new Date(item.expiresAt)).dateString}`,
    },
    {
      align: "center",
      key: "5",
      label: "Used",
      dataIndex: "used",
      render: (item) => `${item.usedBy.length || 0}`,
    },
    {
      align: "center",
      key: "6",
      label: "Remaining",
      dataIndex: "remaining",
      render: (item) => `${item.limit - item.usedBy.length || 0}`,
    },
    {
      align: "center",
      key: "7",
      label: "Limit",
      dataIndex: "limit",
    },
    {
      align: "right",
      key: "8",
      label: "",
      dataIndex: "edit",
      render: (item) => (
        <IconButton onClick={() => handleOpenDeleteDialog(item)}>
          <Delete sx={{ fontSize: "0.8em" }} />
        </IconButton>
      ),
    },
  ];

  const handleOpenDeleteDialog = (item) => {
    setSelectedCoupon(item);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedCoupon(null);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteCoupon(selectedCoupon));
    handleCloseDeleteDialog();
  };

  if (!items.length)
    return (
      <Box sx={{ padding: "3em 0" }}>
        <Empty
          title={"No Coupons Yet"}
          subtitle="Click the 'Add New' button the add one."
        />
      </Box>
    );

  return (
    <>
      <AppTable columns={columns} data={items} rowKey="_id" />
      <CouponDeleteDialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default memo(Coupons);
