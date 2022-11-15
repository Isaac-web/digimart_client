import { Avatar } from "@mui/material";

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
  // {
  //   key: "3",
  //   label: "Last Seen",
  //   dataIndex: "lastSeen",
  // },
];

export const employees = [
  {
    _id: "1",
    image: "",
    name: "Employee 1",
    salary: "Ghc 2000",
    designation: "Rider",
    lastSeen: "Just Now",
  },
  {
    _id: "2",
    image: "",
    name: "Employee 2",
    salary: "Ghc 5000",
    designation: "Manager",
    lastSeen: "Online",
  },
  {
    _id: "3",
    image: "",
    name: "Employee 3",
    salary: "Ghc 2000",
    designation: "Rider",
    lastSeen: "Just Now",
  },
  {
    _id: "4",
    image: "",
    name: "Employee 1",
    salary: "Ghc 2300",
    designation: "Sales Person",
    lastSeen: "Online",
  },
];
