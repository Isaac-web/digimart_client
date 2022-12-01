import React, { createContext, useState, useEffect, useRef } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import { io } from "socket.io-client";
import storage from "../utils/storage";
import useUser from "../customHooks/useUser";
import { appendOrder } from "../store/reducers/entities/orders";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../store/reducers/utils/snackbar";
import sound from "../assets/audio/simple_notification.mp3";

export const AppContext = createContext(null);
let audio = new Audio(sound);
const AppContextWrapper = ({ children, value }) => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const theme = useTheme();
  const user = useUser();

  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesLG = useMediaQuery(theme.breakpoints.down("lg"));
  const matchesXL = useMediaQuery(theme.breakpoints.down("xl"));
  const token = storage.getItem("token");

  const [drawerOpen, setDrawerOpen] = useState(true);
  const drawerMargin = drawerOpen ? 230 : 0;

  const handleAppendOrder = (order) => {
    if (!user || !order) return;

    const orderObject = JSON.parse(order);
    if (orderObject.branch._id === user.branchId) {
      dispatch(
        showSnackbar({
          message: "You have an incoming order.",
          severity: "info",
        })
      );
      dispatch(appendOrder(orderObject));
      audio.play();
    }
  };

  const socketInitialized = useRef(false);
  useEffect(() => {
    if (!socketInitialized.current) {
      setSocket(io(process.env.REACT_APP_SOCKET_URI));
      socketInitialized.current = true;
    }
  }, []);

  const userConnected = useRef(false);
  useEffect(() => {
    if (socket && user) {
      if (!userConnected.current) {
        socket.on("connect", () => {
          socket.emit("userOnline", { userId: user._id });
          socket.on("newOrder", handleAppendOrder);
        });
        userConnected.current = true;
      }
    }

    return () => {};
  }, [socket]);

  return (
    <AppContext.Provider
      value={{
        token,
        matchesXS,
        matchesSM,
        matchesMD,
        matchesLG,
        matchesXL,
        drawerOpen: token ? drawerOpen : false,
        setDrawerOpen,
        drawerMargin: token ? drawerMargin : 0,
        socket,
        ...value,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextWrapper;
