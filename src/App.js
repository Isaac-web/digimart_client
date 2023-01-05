import React from "react";
import { Box, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";

import AppContext from "./context/AppContext";
import Drawer from "./components/AppDrawer";
import Main from "./components/Main";
import theme from "./theme";
import configureReduxStore from "./store";
import AppSnacbar from "./components/AppSnacbar";
import DateTimeProvider from "./components/DateTimeProvider";

export const store = configureReduxStore();
const App = () => {
  return (
    <Provider store={store}>
      <AppContext>
        <DateTimeProvider>
          <ThemeProvider theme={theme}>
            <Box
              sx={(theme) => ({ backgroundColor: theme.palette.common.light })}
            >
              <AppSnacbar />
              <Drawer />
              <Main />
            </Box>
          </ThemeProvider>
        </DateTimeProvider>
      </AppContext>
    </Provider>
  );
};

export default App;
