export const API_URL: string = import.meta.env.VITE_API_URL;
export const FRONTEND_URL: string = import.meta.env.VITE_FRONTEND_URL;
export const GOOGLE_CLIENT_ID: string = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const WS_URL = API_URL.replace("http://", "ws://").replace(
  "https://",
  "wss://"
);

/** Local Storage Key */
export const STORAGE_KEY = "my-app";
