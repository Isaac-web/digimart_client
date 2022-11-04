import { BsBarChartFill, BsBox, BsFillPeopleFill } from "react-icons/bs";
import { GiPieSlice } from "react-icons/gi";

export const dashboardData = [
  {
    title: "1,024",
    subtitle: "Products",
    xData: "-3%",
    Icon: <BsBox />,
    iconColor: "#FFFFFF",
    iconBackgroundColor: "#FCE700",
  },
  {
    title: "12,800",
    subtitle: "Customers",
    xData: "+4%",
    Icon: <BsFillPeopleFill />,
    iconColor: "#000000",
    iconBackgroundColor: "#00F5FF",
  },
  {
    title: "12,800",
    subtitle: "Sales",
    xData: "+4%",
    Icon: <BsBarChartFill />,
    iconColor: "#000000",
    iconBackgroundColor: "#B3FFAE",
  },
  {
    title: "49",
    subtitle: "Recipes",
    xData: "+4%",
    Icon: <GiPieSlice />,
    iconColor: "#FFFFFF",
    iconBackgroundColor: "#FF6464",
  },
];

export const productPerformance = {
  columns: [
    {
      key: "1",
      title: "",
      dataIndex: "image",
    },
    {
      key: "1",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "2",
      title: "Category",
      dataIndex: "category",
    },
    {
      key: "3",
      align: "right",
      title: "Orders",
      dataIndex: "completedOrders",
    },
  ],

  data: [
    {
      key: "2",
      image: <div className="h-10 w-10 rounded-md bg-red-100"></div>,
      name: "Bread Flour",
      category: "Beverages",
      completedOrders: "9",
    },
    {
      key: "3",
      image: <div className="h-10 w-10 rounded-md bg-red-100"></div>,
      name: "Carrots",
      category: "Vegetables",
      completedOrders: "20",
    },
    {
      key: "5",
      image: <div className="h-10 w-10 rounded-md bg-red-100"></div>,
      name: "Choko Bread",
      category: "Beverages",
      completedOrders: "72",
    },
  ],
};
