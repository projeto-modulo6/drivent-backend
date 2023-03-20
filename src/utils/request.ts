import axios from "axios";
import { requestError } from "@/errors";

async function get(url: string, config: object = {}) {
  try {
    const result = await axios.get(url, config);
    return result;
  } catch (error) {
    const { status, statusText } = error.response;

    return requestError(status, statusText);
  }
}

async function post(url: string, params: object = {}, config: object = {}) {
  try {
    const result = await axios.post(url, params, config);
    return result;
  } catch (error) {
    const { status, statusText } = error.response;

    return requestError(status, statusText);
  }
}

export const request = {
  get,
  post,
};
