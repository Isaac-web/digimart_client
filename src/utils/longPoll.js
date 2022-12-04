import axios from "axios";
import storage from "./storage";

export const subscribe = async (url, callback) => {
  if (typeof url !== "string") throw new Error("url is must be a string.");

  const token = storage.getItem("token");
  if (token) {
    axios.interceptors.request.use((req) => {
      req.headers["x-auth-token"] = token;
      return req;
    });
  }

  const res = await axios.get(url);
  if (res.status === 502) {
    await subscribe(url, callback);
  } else if (res.status === 200) {
    if (callback) callback(res.data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    subscribe(url, callback);
  } else {
    console.log("Something went wrong");
  }
};
