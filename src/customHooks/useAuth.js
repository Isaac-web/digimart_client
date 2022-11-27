import storage from "../utils/storage";

const useAuth = () => {
  const token = storage.getItem("token");
  return token ? true : false;
};

export default useAuth;
