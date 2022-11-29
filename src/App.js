import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";

import AppContext from "./context/AppContext";
import Drawer from "./components/AppDrawer";
import Main from "./components/Main";
import theme from "./theme";
import configureReduxStore from "./store";
import AppSnacbar from "./components/AppSnacbar";
import DateTimeProvider from "./components/DateTimeProvider";

const App = () => {
  const store = configureReduxStore();
  useEffect(() => {}, []);

  // const socket = io("http://localhost:9000");
  // console.log(socket);
  // socket.on("connect", () => {
  //   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  // });

  return (
    <Provider store={store}>
      <AppContext>
        <DateTimeProvider>
          <ThemeProvider theme={theme}>
            <div>
              <AppSnacbar />
              <Drawer />
              <Main />
            </div>
          </ThemeProvider>
        </DateTimeProvider>
      </AppContext>
    </Provider>
  );
};

export default App;
