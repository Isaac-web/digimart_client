import React, { useContext, useEffect, useRef } from "react";
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
import Branches from "../pages/Branches";
import User from "../pages/User";
import UpdateCategory from "../pages/UpdateCategory";
import EditProduct from "../pages/EditProduct";
import NewUser from "../pages/NewUser";
import NewBranch from "../pages/NewBranch";
import EditBranch from "../pages/EditBranch";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import { subscribe } from "../utils/longPoll";
import { fetchPendingOrders } from "../store/reducers/entities/orders";
import { useDispatch } from "react-redux";
import Recipes from "../pages/Recipes";
import EditRecipe from "../pages/EditRecipe";
import RecipeDetails from "../pages/RecipeDetails";

const Main = () => {
  const { drawerMargin } = useContext(AppContext);
  const dispatch = useDispatch();

  const longPolling = useRef(false);
  // useEffect(() => {
  //   if (!longPolling.current) {
  //     subscribe(
  //       `${process.env.REACT_APP_API_URI}/orders/branch/pending?status=0`,
  //       (count) => dispatch(fetchPendingOrders(count))
  //     );
  //     longPolling.current = true;
  //   }
  // }, []);

  return (
    <Box
      sx={(theme) => ({
        marginLeft: `${drawerMargin}px`,
        minHeight: "100vh",
        transition: theme.transitions.create(["margin"]),
      })}
    >
      <AppNavBar />

      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/products" element={<Products />} />
          <Route path="/products/new" element={<NewProduct />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/categories/new" element={<NewCategory />} />
          <Route path="/categories/update/:id" element={<UpdateCategory />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/employees/new" element={<NewUser />} />
          <Route path="/employees" element={<User />} />
          <Route path="/branches/edit/:id" element={<EditBranch />} />
          <Route path="/branches/new" element={<NewBranch />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/home" element={<Home />} />
          <Route path="/recipes/new" element={<EditRecipe />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Box>
  );
};

export default Main;
