import React from "react";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";

import AppContext from "./context/AppContext";
import Drawer from "./components/AppDrawer";
import Main from "./components/Main";
import theme from "./theme";
import configureReduxStore from "./store";

const App = () => {
  const store = configureReduxStore();
  return (
    <Provider store={store}>
      <AppContext>
        <ThemeProvider theme={theme}>
          <div>
            <Drawer />
            <Main />
          </div>
        </ThemeProvider>
      </AppContext>
    </Provider>
  );
};

export default App;
