import React, { useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@/data/helpers/base/local_storage_utility";
import { useAppContext } from "@/ui/global_context/AppStateContext";
import { UserWithTokenModel } from "@/domain/models/user/user_model";
import { usePasswordRegister } from "./hooks/usePasswordRegister";
import { useGoogleRegister } from "./hooks/useGoogleRegister";

function useRegisterState() {
  const navigate = useNavigate();
  const storage = useLocalStorage();
  const appState = useAppContext();

  /** UX */
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Password Email Method */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleResult(result: UserWithTokenModel) {
    appState.setUser(result.user);
    storage.set({
      accessToken: result.access_token,
      refreshToken: result.refresh_token,
    });
    navigate("/main", { replace: true });
  }

  const { register } = usePasswordRegister({
    setIsLoading,
    setError,
    handleResult,
  });

  const { handleGoogleSignUp } = useGoogleRegister({
    setIsLoading,
    setError,
    handleResult,
  });

  return {
    register,
    handleGoogleSignUp,
    isLoading,
    error,
    passwordEmailForm: {
      name,
      setName,
      email,
      setEmail,
      password,
      setPassword,
      confirmPassword,
      setConfirmPassword,
    },
  };
}

type RegisterContextType = ReturnType<typeof useRegisterState>;

const RegisterContext = React.createContext<RegisterContextType>(
  {} as RegisterContextType
);

export function RegisterProvider({ children }: { children: ReactNode }) {
  return (
    <RegisterContext.Provider value={useRegisterState()}>
      {children}
    </RegisterContext.Provider>
  );
}

export function useRegisterContext() {
  return useContext(RegisterContext);
}
