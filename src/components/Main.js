import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";

import AppNavBar from "./AppNavBar";
import Categories from "../pages/Categories";
import Home from "../pages/Home";
import NewCategory from "../pages/NewCategory";
import NewProduct from "../pages/NewProduct";
import Orders from "../pages/Orders";
import Products from "../pages/Products";

import { AppContext } from "../context/AppContext";
import ProductDetails from "../pages/ProductDetails";
import OrderDetails from "../pages/OrderDetails";
import Customers from "../pages/Customers";
import Transaction from "../pages/Transactions";
import Employees from "../pages/Employees";
import Charts from "../pages/Charts";
import Calender from "../pages/Calender";
import UpdateCategory from "../pages/UpdateCategory";

const Main = () => {
  const { drawerMargin } = useContext(AppContext);

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.common.light,
        marginLeft: `${drawerMargin}px`,
        minHeight: "100vh",
        transition: theme.transitions.create(["margin"]),
      })}
    >
      <AppNavBar />
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/products/new" element={<NewProduct />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/categories/new" element={<NewCategory />} />
        <Route path="/categories/update/:id" element={<UpdateCategory />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/transactions" element={<Transaction />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </Box>
  );
};

export default Main;
