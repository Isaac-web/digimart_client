import React from "react";
import { ThemeProvider } from "@mui/material";

import AppContext from "./context/AppContext";
import Drawer from "./components/AppDrawer";
import Main from "./components/Main";
import theme from "./theme";

const App = () => {
  return (
    <AppContext>
      <ThemeProvider theme={theme}>
        <div>
          <Drawer />
          <Main />
        </div>
      </ThemeProvider>
    </AppContext>
  );
};

export default App;
