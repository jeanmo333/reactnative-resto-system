/** @format */

import axios from "axios";

const clientAxios = axios.create({
  baseURL: "http://192.168.1.6:4000/api",
});

export default clientAxios;
