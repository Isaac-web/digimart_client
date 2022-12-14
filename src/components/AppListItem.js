import { MoreVert } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

const AppListItem = ({
  avatarUrl,
  avatarShown = false,
  title,
  subtitle,
  onSecondaryAction,
  secondaryButtonShown,
}) => {
  return (
    <ListItem>
      {(avatarShown || avatarUrl) && (
        <ListItemAvatar>
          <Avatar src={avatarUrl} />
        </ListItemAvatar>
      )}
      <ListItemText
        primary={title}
        secondary={
          subtitle && <Typography variant="subtitle2">{subtitle}</Typography>
        }
      />
      {secondaryButtonShown && (
        <ListItemSecondaryAction>
          <IconButton onClick={onSecondaryAction}>
            <MoreVert />
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

export default AppListItem;
