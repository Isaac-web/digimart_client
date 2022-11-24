import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  List,
  Paper,
  Typography,
  ListItem,
  useTheme,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  MenuItem,
  Menu,
  Icon,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBranches,
  deleteBranch,
} from "../store/reducers/entities/branches";
import {} from "react-redux";

import SearchField from "../components/SearchField";
import { Delete, Edit, MoreHoriz } from "@mui/icons-material";

const Branches = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const branches = useSelector((state) => state.entities.branches);

  useEffect(() => {
    dispatch(fetchBranches());
  }, []);

  const handleDelete = (item) => {
    dispatch(deleteBranch(item._id));
  };
  const handleEdit = (item) => {
    navigate(`/branches/edit/${item._id}`);
  };

  return (
    <Container maxWidth={"md"}>
      <Box>
        <Typography variant="h4">Branches</Typography>
        <Typography variant="subtitle2">
          There are 2 branches in the database
        </Typography>

        <Box>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={10}>
              <SearchField placeholder="Search branches" />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button component={Link} to="/branches/new">
                New Branch
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ paddingTop: "1em" }}>
          <List>
            {branches.data.map((b) => (
              <Paper sx={{ marginBottom: "0.5em" }} key={b._d}>
                <BranchListItem
                  item={b}
                  onDelete={() => handleDelete(b)}
                  onEdit={() => handleEdit(b)}
                />
              </Paper>
            ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
};

const BranchListItem = ({ item, onDelete, onEdit }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);

  const menus = [
    { label: "Edit", Icon: <Edit />, onClick: onEdit },
    { label: "Delete", Icon: <Delete />, onClick: onDelete },
  ];

  const openMenu = ({ target }) => {
    setAnchorEl(target);
    setOpen(true);
  };

  const closeMenu = ({ target }) => {
    setOpen(false);
    setAnchorEl(null);
  };

  return (
    <>
      <ListItem>
        <ListItemText
          primary={item.name}
          secondary={<Typography variant="subtitle2">{"Subtitle"}</Typography>}
        />
        <ListItemSecondaryAction>
          <IconButton onClick={openMenu}>
            <MoreHoriz />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

      <Menu open={open} anchorEl={anchorEl} onClose={closeMenu}>
        {menus.map((item) => (
          <MenuItem onClick={item.onClick}>
            <IconButton disableRipple>{item.Icon}</IconButton>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Branches;
