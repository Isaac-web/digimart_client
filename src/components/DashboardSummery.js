import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { BsBarChartFill, BsBox, BsFillPeopleFill } from "react-icons/bs";
import { GiPieSlice } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import { fetchSummery } from "../store/reducers/entities/dashboardSummery";

import DashboardSummeryTile from "./DashboardSummeryTile";

const DashboardSummery = () => {
  const dispatch = useDispatch();

  const summery = useSelector((state) => state.entities.dashboardSummery);

  const dashboardData = [
    {
      title: summery.data?.productsCount || 0,
      subtitle: "Products",
      xData: "-3%",
      Icon: <BsBox />,
      iconColor: "#FFFFFF",
      iconBackgroundColor: "#FCE700",
      loading: summery?.loading || false,
    },
    {
      title: summery.data?.customerCount || 0,
      subtitle: "Customers",
      xData: "+4%",
      Icon: <BsFillPeopleFill />,
      iconColor: "#000000",
      iconBackgroundColor: "#00F5FF",
      loading: summery?.loading || false,
    },
    {
      title: "N/A",
      subtitle: "Sales",
      xData: "+4%",
      Icon: <BsBarChartFill />,
      iconColor: "#000000",
      iconBackgroundColor: "#B3FFAE",
      loading: summery?.loading || false,
    },
    {
      title: summery.data.recipeCount || 0,
      subtitle: "Recipes",
      xData: "+4%",
      Icon: <GiPieSlice />,
      iconColor: "#FFFFFF",
      iconBackgroundColor: "#FF6464",
      loading: summery?.loading || false,
    },
  ];

  useEffect(() => {
    dispatch(fetchSummery());
  }, []);

  return (
    <Grid container spacing={3}>
      {dashboardData.map((item, index) => (
        <DashboardSummeryTile
          key={index.toString()}
          title={item.title}
          subtitle={item.subtitle}
          xData={item.xData}
          Icon={item.Icon}
          iconColor={item.iconColor}
          iconBackgroundColor={item.iconBackgroundColor}
          loading={item.loading}
        />
      ))}
    </Grid>
  );
};

export default DashboardSummery;
