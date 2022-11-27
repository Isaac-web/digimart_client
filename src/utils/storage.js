const getItem = (key) => {
  if (typeof key !== "string") throw new Error("key must be a string.");
  try {
    const payload = JSON.parse(localStorage.getItem(key));
    return payload;
  } catch (err) {
    console.log(err);
  }
};

const setItem = (key, value) => {
  if (typeof key !== "string") throw new Error("key must be a string.");

  const payload = JSON.stringify(value);
  try {
    localStorage.setItem(key, payload);
  } catch (err) {
    console.log(err);
  }
};

const clear = () => {
  localStorage.clear();
};

export default {
  clear,
  getItem,
  setItem,
};
