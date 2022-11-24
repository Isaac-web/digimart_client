import React, { useState, useEffect, useRef } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchRiders } from "../store/reducers/entities/riders";

const RiderPicker = ({ rider, onRiderChange }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const apiCalled = useRef(false);

  const riders = useSelector((state) => state.entities.riders);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const mapToViewModel = (data) => {
    if (data && data?.length) {
      return data.map((emp) => ({
        _id: emp._id,
        name: `${emp.firstname} ${emp.lastname}`,
        designation: emp.designation.value,
        imageUri: emp.imageuri,
      }));
    }
    return [];
  };

  const employees = mapToViewModel(riders.data);

  const raiseRiderSelect = (rider) => {
    handleCloseDialog();
    onRiderChange(rider);
  };

  useEffect(() => {
    if (!apiCalled.current) {
      dispatch(fetchRiders());
      apiCalled.current = true;
    }
  }, []);

  return (
    <>
      <Paper
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
              <InputAdornment position="start" sx={{ padding: "0 0.5em" }}>
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
            primary={e.name}
            secondary={
              <Typography key={e._id || e.id} variant="subtitle2">
                {e.designation}
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
