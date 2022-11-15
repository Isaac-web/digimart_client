import { Box, Button, CardMedia } from "@mui/material";
import { useDispatch } from "react-redux";

import { deleteProduct } from "../store/reducers/entities/products";

export const productTableColumns = [
  {
    label: "",
    key: "image",
    dataIndex: "image",
    render: (item) => {
      console.log(item);
      return (
        <CardMedia
          image={item?.imageUri || "none"}
          sx={(theme) => ({
            height: "3.5em",
            width: "3.5em",
            backgroundColor: theme.palette.common.extraLight,
            borderRadius: theme.rounded.small,
          })}
        />
      );
    },
  },
  { label: "Name", key: "name", dataIndex: "name" },
  { label: "Category", key: "categogy", dataIndex: "category" },
  { label: "Price", key: "price", dataIndex: "price" },
  {
    align: "right",
    label: "",
    key: "deleteButton",
    dataIndex: "deleteButton",
    render: (item) => <DeleteButton item={item} />,
  },
];

export const items = [
  {
    id: "1",
    name: "Mango",
    category: "Fruits",
    price: 2,
    status: "Available",
  },
  {
    id: "2",
    name: "Cabbage",
    category: "Vegetable",
    price: 2,
    status: "Available",
  },
  {
    id: "3",
    name: "Beef",
    category: "Meat",
    price: 2,
    status: "Available",
  },
  {
    id: "4",
    name: "Bread",
    category: "Beverage",
    price: 2,
    status: "Available",
  },
  {
    id: "5",
    name: "Tilapia",
    category: "Fish",
    price: 2,
  },
];

const DeleteButton = ({ item }) => {
  const dispatch = useDispatch();

  const handleDelete = (e, item) => {
    e.stopPropagation();

    dispatch(deleteProduct(item._id));
  };

  return (
    <Button
      size="small"
      variant={"outlined"}
      onClick={(e) => handleDelete(e, item)}
    >
      Delete
    </Button>
  );
};
