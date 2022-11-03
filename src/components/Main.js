import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AppNavBar from "./AppNavBar";
import Categories from "../pages/Categories";
import Home from "../pages/Home";
import NewProduct from "../pages/NewProduct";
import Orders from "../pages/Orders";
import Products from "../pages/Products";

const Main = () => {
  return (
    <div style={{ background: "rgba(0, 0, 50, 0.05)", marginLeft: 260 }}>
      <AppNavBar />
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/products/new" element={<NewProduct />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
};

export default Main;
