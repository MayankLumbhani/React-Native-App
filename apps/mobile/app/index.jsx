import { useEffect } from "react";
import { router } from "expo-router";
import { isAuthenticated } from "../src/auth/auth.session";

export default function Index() {
  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();

      if (authenticated) {
        router.replace("/(app)/(tabs)");
      } else {
        router.replace("/(auth)/splash");
      }
    };

    checkAuth();
  }, []);

  return null;
}