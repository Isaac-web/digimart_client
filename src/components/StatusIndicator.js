import React, { useRef } from "react";
import { CircularProgress, Chip } from "@mui/material";

const StatusIndicator = ({ value = 0, loading }) => {
  const labels = {
    0: { label: "Pending", color: "gray" },
    1: { label: "Processing", color: "yellow" },
    2: { label: "Dispatched", color: "Pink" },
    3: { label: "Delivered", color: "blue" },
    4: { label: "Order Confirmed", color: "Green" },
  };

  if (loading) return <CircularProgress size="1em" />;

  return (
    <Chip
      sx={{
        borderColor: labels[value.toString()].color,
        color: labels[value.toString()].color,
      }}
      color="primary"
      label={labels[value.toString()].label}
      variant="outlined"
    />
  );
};

export default StatusIndicator;
