import { GoogleOAuthContext } from "./third_party/google_auth";
import { ToastProvider } from "./ui/features/toast/ToastContext";
import AppStateProvider from "./ui/global_context/AppStateContext";
import AppRoutes from "./ui/routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <GoogleOAuthContext>
      <BrowserRouter>
        <AppStateProvider>
          <ToastProvider>
            <AppRoutes />
          </ToastProvider>
        </AppStateProvider>
      </BrowserRouter>
    </GoogleOAuthContext>
  );
}
