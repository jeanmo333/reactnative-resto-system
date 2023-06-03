/** @format */

import axios from "axios";
import { API_URL_DEV, API_URL_PRODUCTION } from "@env";

const clientAxios = axios.create({
  baseURL: `${API_URL_PRODUCTION}/api`,
});

export default clientAxios;
