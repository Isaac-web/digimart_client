import { Avatar, Chip } from "@mui/material";

export const tableColumns = [
  {
    key: "0",
    render: (item) => (
      <Avatar
        sx={(theme) => ({ backgroundColor: theme.palette.common.extraLight })}
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
    label: "Status",
    render: () => <Chip label="Premium" variant="outlined" />,
    dataIndex: "status",
    align: "center",
  },
  {
    key: "5",
    label: "Number Of Orders",
    dataIndex: "numberOfOrders",
    align: "right",
  },
];

export const customers = [
  {
    _id: "1",
    name: "John Doe",
    phone: "555-555-5555",
    email: "johnexample@gmail.com",
    status: 3,
    numberOfOrders: 24,
  },
  {
    _id: "2",
    name: "John Doe",
    phone: "555-555-5555",
    email: "johnexample@gmail.com",
    status: 3,
    numberOfOrders: 24,
  },
  {
    _id: "3",
    name: "John Doe",
    phone: "555-555-5555",
    email: "johnexample@gmail.com",
    status: 3,
    numberOfOrders: 24,
  },
  {
    _id: "4",
    name: "John Doe",
    phone: "555-555-5555",
    email: "johnexample@gmail.com",
    status: 3,
    numberOfOrders: 24,
  },
];
