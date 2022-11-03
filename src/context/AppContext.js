import React, { createContext } from "react";
import { useTheme, useMediaQuery } from "@mui/material";

export const AppContext = createContext(null);

const AppContextWrapper = ({ children, value }) => {
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesLG = useMediaQuery(theme.breakpoints.down("lg"));
  const matchesXL = useMediaQuery(theme.breakpoints.down("xl"));

  return (
    <AppContext.Provider
      value={{
        matchesXS,
        matchesSM,
        matchesMD,
        matchesLG,
        matchesXL,
        ...value,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextWrapper;
