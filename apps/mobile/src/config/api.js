export const API_URL = process.env.EXPO_PUBLIC_API_URL;
console.log("=== CONFIG DIAGNOSTICS ===");
console.log("process.env.EXPO_PUBLIC_API_URL:", process.env.EXPO_PUBLIC_API_URL);
console.log("API_URL mapped to:", API_URL);

if (!API_URL) {
    console.error("FATAL: API_URL is undefined! Network requests will fail.");
}