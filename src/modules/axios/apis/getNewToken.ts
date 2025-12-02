import axios from "axios";
import { SERVER_URL } from "../constants";
import type { RefreshDTO } from "../types";

export const getNewToken = async (refreshToken: string) => {
  const { data } = await axios.post<RefreshDTO>(`${SERVER_URL}/api/v1/auth/refresh`, undefined, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  return data;
};
