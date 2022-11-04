import { AiOutlineHome, AiOutlineAreaChart } from "react-icons/ai";
import { BsBagDash, BsBox } from "react-icons/bs";
import {
  MdOutlineCategory,
  MdOutlinePeople,
  MdTipsAndUpdates,
} from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";
import { CiYoutube } from "react-icons/ci";

const sections = {
  dashboard: [{ title: "Home", Icon: <AiOutlineHome />, link: "/home" }],
  market: [
    { title: "Orders", Icon: <BsBagDash />, link: "/orders" },
    { title: "Products", Icon: <BsBox />, link: "/products" },
    { title: "Categories", Icon: <MdOutlineCategory />, link: "/categories" },
    { title: "Customers", Icon: <MdOutlinePeople />, link: "/customers" },
  ],
  report: [
    { title: "Transactions", Icon: <GrTransaction />, link: "/transactions" },
    { title: "Charts", Icon: <AiOutlineAreaChart />, link: "/charts" },
    { title: "Calender", Icon: <SlCalender />, link: "/calender" },
  ],
  media: [
    { title: "Recepies", Icon: <CiYoutube />, link: "/recipies" },
    {
      title: "Cooking Tips",
      Icon: <MdTipsAndUpdates />,
      link: "/cooking-tips",
    },
  ],
};

export default sections;

//todo: market
//orders
//products
//categories
//customers

//todo: report
//charts
//reports
//calender

//todo: media
//recipies videos
//cooking tips
