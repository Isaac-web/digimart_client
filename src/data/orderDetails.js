import { Button, CardMedia } from "@mui/material";

export const columns = [
  {
    id: "1",
    render: (item) => (
      <CardMedia
        image={item?.imageUri}
        sx={(theme) => ({
          height: "3em",
          width: "3em",
          backgroundColor: theme.palette.common.light,
          borderRadius: theme.rounded.small,
        })}
      />
    ),
    dataIndex: "item",
    key: "item",
  },
  {
    id: "2",
    label: "Item",
    dataIndex: "item",
    key: "item",
  },
  { id: "3", label: "Quantity", dataIndex: "quantity", key: "quantity" },
  { id: "4", label: "Unit Price", dataIndex: "price", key: "price" },
  { id: "5", label: "Subtotal", dataIndex: "subtotal", key: "subtotal" },
  {
    id: "6",
    label: "",
    dataIndex: "addProductButton",
    key: "addProductButton",
    align: "right",
    render: (item) => (
      <Button variant="outlined" size="small">
        Clear
      </Button>
    ),
  },
];

export const items = [
  {
    _id: "1",
    item: "Carrot",
    quantity: "3",
    price: "3.00",
    subtotal: "9.00",
  },
  {
    _id: "2",
    item: "Frytol",
    quantity: "1",
    price: "57.00",
    subtotal: "57.00",
  },
  {
    _id: "3",
    item: "Bread",
    quantity: "1",
    price: "10.00",
    subtotal: "10.00",
  },
  {
    _id: "4",
    item: "Baking Powder",
    quantity: "1",
    price: "8.00",
    subtotal: "8.00",
  },
];

export const orderDetails = {
  customerDetails: { title: "Customer Name", value: "John Details" },
  phoneNumber: { title: "Phone Number", value: "555 555 5555" },
  paymentMethod: { title: "Payment method", value: "Cash" },
  deliveryDate: { title: "Delivery Date", value: "1st Dec, 2022" },
  note: { title: "Note", value: "This is a note" },
};

export const orderSummery = [
  { id: "1", title: "Order Created", value: "Sun May 7, 2022" },
  { id: "2", title: "Order Time", value: "06:24 AM" },
  { id: "3", title: "Sub Total", value: 120 },
  { id: "4", title: "Delivery Fee", value: 5 },
];

export const orderAddress = [
  { id: "1", title: "City", value: "Accra" },
  { id: "2", title: "Area", value: "Spintex" },
  { id: "3", title: "Coordinates", value: "120.223, 1124.897" },
];
