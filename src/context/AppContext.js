import React, { createContext, useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import storage from "../utils/storage";

export const AppContext = createContext(null);

const AppContextWrapper = ({ children, value }) => {
  const theme = useTheme();
  const token = storage.getItem("token");
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesLG = useMediaQuery(theme.breakpoints.down("lg"));
  const matchesXL = useMediaQuery(theme.breakpoints.down("xl"));

  const [drawerOpen, setDrawerOpen] = useState(true);
  const drawerMargin = drawerOpen ? 230 : 0;

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
        ...value,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextWrapper;
