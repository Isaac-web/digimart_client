import storage from "../utils/storage";
import jwtDecode from "jwt-decode";

const useUser = () => {
  const token = storage.getItem("token");
  if (!token) return null;

  return jwtDecode(token);
};

export default useUser;
