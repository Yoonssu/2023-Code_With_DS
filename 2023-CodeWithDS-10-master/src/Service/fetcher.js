import axios from "axios";

const url = "/data/menus.json";

export const getMenus = () => {
  const res = axios(url);
  return res;
};
