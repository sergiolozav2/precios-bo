import axios from "axios";
import { apiURL } from "./constants";

export const backend = axios.create({ baseURL: apiURL });
