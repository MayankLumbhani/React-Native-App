import { getToken } from "../storage/auth.storage";

export const isAuthenticated = async () => {
  const token = await getToken();

  return !!token;
};