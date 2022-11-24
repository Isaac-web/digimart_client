import { Avatar, Icon, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";

import { deleteEmployee } from "../store/reducers/entities/employees";

export const tableColumns = [
  {
    key: "0",
    label: null,
    render: (item) => (
      <Avatar
        sx={(theme) => ({
          backgroundColor: theme.palette.common.extraLight,
        })}
        image=""
      />
    ),
    dataIndex: "image",
  },
  {
    key: "1",
    label: "Name",
    dataIndex: "name",
  },
  {
    key: "2",
    label: "Phone",
    dataIndex: "phone",
  },
  {
    key: "3",
    label: "Email",
    dataIndex: "email",
  },
  {
    key: "4",
    label: "Job Title",
    dataIndex: "designation",
  },
  {
    key: "5",
    label: null,
    dataIndex: "deleteButton",
    render: (item) => <DeleteButton item={item} />,
  },
];

export const employees = [];

const DeleteButton = ({ item }) => {
  const dispatch = useDispatch();

  const handleDelete = (item) => {
    dispatch(deleteEmployee(item._id))
  };

  return (
    <IconButton onClick={() => handleDelete(item)}>
      <Delete />
    </IconButton>
  );
};
