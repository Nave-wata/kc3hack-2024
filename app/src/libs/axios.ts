import Axios from "axios";
import { API_ENDPOINT } from "../config";

/**
 * バックエンドのAPIを叩く際に利用する axios インスタンス
 */
export const axios = Axios.create({
  baseURL: API_ENDPOINT,
});
