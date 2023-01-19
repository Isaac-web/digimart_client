import { Avatar, Chip } from "@mui/material";

export const tableColumns = [
  {
    key: "0",
    render: (item) => (
      <Avatar
        sx={(theme) => ({ backgroundColor: theme.palette.common.extraLight })}
        image={item.image}
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

