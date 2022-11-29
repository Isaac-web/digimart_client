import { AiOutlineHome } from "react-icons/ai";
import { BsBagDash, BsBox } from "react-icons/bs";
import {
  MdOutlineCategory,
  MdOutlinePeople,
  MdTipsAndUpdates,
} from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { CiYoutube } from "react-icons/ci";
import { RiTeamFill } from "react-icons/ri";

const sections = {
  dashboard: {
    entities: [{ title: "Home", Icon: <AiOutlineHome />, link: "/home" }],
  },
  market: {
    auth: ["admin", "manager"],
    entities: [
      { title: "Orders", Icon: <BsBagDash />, link: "/orders" },
      { title: "Products", Icon: <BsBox />, link: "/products" },
      { title: "Categories", Icon: <MdOutlineCategory />, link: "/categories" },
      { title: "Customers", Icon: <MdOutlinePeople />, link: "/customers" },
    ],
  },
  report: {
    auth: ["admin"],
    entities: [
      { title: "Employees", Icon: <RiTeamFill />, link: "/employees" },
      { title: "Branches", Icon: <GrTransaction />, link: "/branches" },
    ],
  },
  media: {
    entities: [
      { title: "Recepies", Icon: <CiYoutube />, link: "/recipies" },
      {
        title: "Cooking Tips",
        Icon: <MdTipsAndUpdates />,
        link: "/cooking-tips",
      },
    ],
  },
};

export default sections;
