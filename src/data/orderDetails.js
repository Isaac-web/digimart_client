import { Button, CardMedia } from "@mui/material";
import { useDispatch } from "react-redux";
import { clearOrderItem } from "../store/reducers/details/order";
import getDateTime from "../utils/getDateTime";

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
    dataIndex: "productName",
    key: "productName",
  },
  { id: "3", label: "Quantity", dataIndex: "quantity", key: "quantity" },
  {
    id: "4",
    label: "Price",
    dataIndex: "unitPrice",
    key: "unitPrice",
    render: (item) => `Ghc ${item.unitPrice}`,
  },
  {
    id: "5",
    label: "Subtotal",
    dataIndex: "subtotal",
    key: "subtotal",
    render: (item) => `Ghc ${item.subtotal}`,
  },
  {
    id: "6",
    label: "",
    dataIndex: "addProductButton",
    key: "addProductButton",
    align: "right",
    render: (item) => <DeleteButton item={item} />,
  },
];

const DeleteButton = ({ item }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(clearOrderItem(item));
  };

  return (
    <Button onClick={handleDelete} variant="outlined" size="small">
      Clear
    </Button>
  );
};

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

export const orderSummary = [
  { id: "1", title: "Order Created", value: "_" },
  { id: "2", title: "Order Time", value: "_" },
  { id: "3", title: "Sub Total", value: "_" },
  { id: "4", title: "Delivery Fee", value: "_" },
];

export const getOrderSummary = (order) => {
  if (!order) {
    return orderSummary;
  } else {
    const dateTime = getDateTime(new Date(order.createdAt));
    return [
      { id: "1", title: "Order Created", value: dateTime.dateString },
      { id: "2", title: "Order Time", value: dateTime.timeString },
      {
        id: "3",
        title: "Sub Total",
        value: `Ghc ${order.subtotal?.toFixed(2)}`,
      },
      {
        id: "4",
        title: "Delivery Fee",
        value: `Ghc ${order?.deliveryFee?.toFixed(2)}`,
      },
    ];
  }
};

export const orderAddress = [
  { id: "1", title: "City", value: "_" },
  { id: "2", title: "Area", value: "_" },
  { id: "3", title: "Coordinates", value: "_, _" },
];

export const getOrderAddress = (order) => {
  if (order) {
    const address = order?.delivery_address?.coordinates;
    return [
      { id: "1", title: "City", value: address?.city || "_" },
      { id: "2", title: "Area", value: address?.area || "_" },
      {
        id: "3",
        title: "Coordinates",
        value:
          `Lat: ${address?.lat}, Long: ${address?.long}` || "Lat: _, Long: _",
      },
    ];
  } else {
    return orderAddress;
  }
};
