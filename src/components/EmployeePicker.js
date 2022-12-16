import React, { memo, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSearch,
  searchEmployees,
} from "../store/reducers/entities/employees";
import useUser from "../customHooks/useUser";

const EmployeePicker = ({
  employee,
  onEmployeeChange,
  emptyContentTitle,
  emptyContentSubtitle,
  pickEmployeeButtonTitle,
  changeEmployeeButtonTitle,
  placeholder,
  designationId,
  title,
  text,
}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useUser();

  const employeeData = useSelector((state) => state.entities.employees);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    dispatch(clearSearch());
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

  const raiseEmployeeSelect = (employee) => {
    onEmployeeChange(employee);
    handleCloseDialog();
  };

  const handleSearch = (value) => {
    dispatch(
      searchEmployees({
        q: value.trim(),
        pageSize: 10,
        designationId,
        branchId: user.branchId || null,
      })
    );
  };

  const handleClearSearch = () => {
    dispatch(clearSearch());
  };

  const employees = mapToViewModel(employeeData.search.data?.items);
  return (
    <>
      <Paper
        sx={(theme) => ({
          borderRadius: theme.rounded.medium,
        })}
      >
        <Box sx={{ padding: "1.5em" }}>
          <Box>
            <Typography variant="h6">{title || "Employee Details"}</Typography>
          </Box>
          {employee ? (
            <Box>
              <Box>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body1" fontWeight="bold">
                        {employee.name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="subtitle2">
                        {employee.title}
                      </Typography>
                    }
                  />
                </ListItem>
              </Box>
              <Box>
                <Button variant="text" onClick={handleOpenDialog}>
                  {changeEmployeeButtonTitle || "Change Employee"}
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>
              <Typography variant="body1">No Info</Typography>
              <Typography variant="subtitle2">
                {text || "The employee for this order has not been set."}
              </Typography>
              <Button
                size="small"
                onClick={handleOpenDialog}
                variant="text"
                sx={{ textTransform: "none" }}
              >
                {pickEmployeeButtonTitle || "Set Employee"}
              </Button>
            </Box>
          )}
        </Box>
      </Paper>

      <Dialog open={open} maxWidth={"sm"} fullWidth onClose={handleCloseDialog}>
        <DialogTitle sx={{}}>
          <DialogSearch
            onSearch={handleSearch}
            onClear={handleClearSearch}
            searching={employeeData.search.loading}
            placeholder={placeholder}
          />
        </DialogTitle>
        <Box sx={{ padding: "0.5em 1.2em" }}>
          <Divider />
        </Box>
        <DialogContent sx={{ height: "18em" }}>
          {employees.length ? (
            <EmployeeList
              list={employees}
              onEmployeeSelect={raiseEmployeeSelect}
            />
          ) : (
            <EmptySearch
              title={emptyContentTitle}
              subtitle={emptyContentSubtitle}
            />
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

const EmptySearch = memo(({ title, subtitle }) => {
  return (
    <Box sx={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Typography variant="h5" align="center">
        {title || "Search Employees"}
      </Typography>
      <Typography varaint="subtitle2" align="center" sx={{ fontSize: "0.9em" }}>
        {subtitle || "Search by firstname, lastname or email address"}
      </Typography>
    </Box>
  );
});

const EmployeeList = memo(({ list, onEmployeeSelect }) => {
  return (
    <List>
      {list?.map((e, index) => (
        <ListItem key={index.toString()}>
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
});

const DialogSearch = memo(
  ({ onSearch, onClear, loading = false, placeholder }) => {
    const raiseClear = ({ target }) => {
      if (!target.value) if (onClear) onClear();
    };

    const raiseSearch = ({ key, target }) => {
      if (key === "Enter") if (onSearch) onSearch(target.value);
    };

    return (
      <InputBase
        fullWidth
        placeholder={placeholder || "Search Employees"}
        onKeyPress={raiseSearch}
        onChange={raiseClear}
        startAdornment={
          <InputAdornment position="start" sx={{ padding: "0 0.5em" }}>
            {loading ? (
              <CircularProgress size={"1em"} />
            ) : (
              <Search color="primary" />
            )}
          </InputAdornment>
        }
        sx={{ padding: "0.3em" }}
        autoFocus
      />
    );
  }
);

export default memo(EmployeePicker);
