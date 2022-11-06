import React, { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  InputBase,
  InputAdornment,
  List,
  ListItemSecondaryAction,
} from "@mui/material";
import { Search } from "@mui/icons-material";

const RiderPicker = ({ rider, onRiderChange }) => {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const employees = [
    // { _id: "1", name: "Tom Kwame", designation: "Rider" },
    // { _id: "2", name: "Adom Kofi", designation: "Rider" },
    // { _id: "3", name: "Antwi", designation: "Rider" },
    // { _id: "4", name: "Dominic Kwame", designation: "Rider" },
  ];

  const raiseRiderSelect = (rider) => {
    handleCloseDialog();
    onRiderChange(rider);
  };

  return (
    <>
      <Paper
        variant="outlined"
        sx={(theme) => ({
          borderRadius: theme.rounded.medium,
        })}
      >
        <Box sx={{ padding: "1.5em" }}>
          <Box>
            <Typography variant="h6">Rider Details</Typography>
          </Box>
          <Box>
            <ListItem>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body1" fontWeight="bold">
                    {rider.name}
                  </Typography>
                }
                secondary={
                  <Typography variant="subtitle2">{rider.title}</Typography>
                }
              />
            </ListItem>
          </Box>
          <Box>
            <Button variant="text" onClick={handleOpenDialog}>
              Change Rider
            </Button>
          </Box>
        </Box>
      </Paper>

      <Dialog open={open} maxWidth={"sm"} fullWidth onClose={handleCloseDialog}>
        <DialogTitle sx={{}}>
          <InputBase
            fullWidth
            placeholder="Search Riders"
            startAdornment={
              <InputAdornment sx={{ padding: "0 0.5em" }}>
                <Search color="primary" />
              </InputAdornment>
            }
            sx={{ padding: "0.3em" }}
            autoFocus
          />
        </DialogTitle>
        <Box sx={{ padding: "0.5em 1.2em" }}>
          <Divider />
        </Box>
        <DialogContent sx={{ height: "18em" }}>
          {employees.length ? (
            <EmployeeList
              list={employees}
              onEmployeeSelect={raiseRiderSelect}
            />
          ) : (
            <EmptySearch />
          )}
        </DialogContent>

        <Box sx={{ padding: "0.5em 1.2em" }}>
          <Divider />
        </Box>
        <DialogActions>
          <Button variant="text" onClick={handleCloseDialog}>
            Close
          </Button>
          <Button>Set Rider</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const EmptySearch = () => {
  return (
    <Box sx={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Typography variant="h5" align="center">
        Search Riders
      </Typography>
      <Typography varaint="subtitle1" align="center">
        Search riders by name in the search box
      </Typography>
    </Box>
  );
};

const EmployeeList = ({ list, onEmployeeSelect }) => {
  return (
    <List>
      {list?.map((e) => (
        <ListItem>
          <ListItemText
            primary={"Name"}
            secondary={
              <Typography key={e._id || e.id} variant="subtitle2">
                Designation
              </Typography>
            }
          />
          <ListItemSecondaryAction>
            <Button
              size="small"
              variant="text"
              onClick={() => onEmployeeSelect(e)}
            >
              Select
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default RiderPicker;
