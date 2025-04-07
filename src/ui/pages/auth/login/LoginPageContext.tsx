import React, { useContext, useState, ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLocalStorage } from "@/data/helpers/base/local_storage_utility";
import { useAppContext } from "@/ui/global_context/AppStateContext";
import { UserWithTokenModel } from "@/domain/models/user/user_model";
import { usePasswordLogin } from "./hooks/usePasswordLogin";
import { useGoogleLogin } from "./hooks/useGoogleLogin";
import TwoFactorRepo from "@/data/remote/user_settings/two_factor_repo";

function useLoginState() {
  const navigate = useNavigate();
  const storage = useLocalStorage();
  const appState = useAppContext();
  const [, setSearchParams] = useSearchParams();

  /** UX */
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Password Email Method */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /** 2FA */
  const [loginToken, setLoginToken] = useState<{
    value: string;
    type: string;
  }>();
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState<boolean>(false);

  function handleResult(result: UserWithTokenModel, type: string) {
    if (result.requires_otp && result.login_token) {
      setLoginToken({
        value: result.login_token,
        type,
      });
      setIsVerifyDialogOpen(true);
      setSearchParams({});
    } else {
      onSuccessSignIn(result);
    }
  }

  function onSuccessSignIn(result: UserWithTokenModel) {
    appState.setUser(result.user);
    storage.set({
      accessToken: result.access_token,
      refreshToken: result.refresh_token,
    });
    navigate("/main", { replace: true });
  }

  async function verifyLogin2FA(verificationCode: string) {
    if (!loginToken) return false;

    try {
      const result = await TwoFactorRepo.login({
        otp_code: verificationCode,
        method: "authenticator",
        type: loginToken.type,
        login_token: loginToken.value,
      });
      onSuccessSignIn(result);
      return true;
    } catch {
      return false;
    }
  }

  const { login } = usePasswordLogin({
    setIsLoading,
    setError,
    handleResult,
  });

  const { handleGoogleSignIn } = useGoogleLogin({
    setIsLoading,
    setError,
    handleResult,
  });

  return {
    login,
    handleGoogleSignIn,
    isLoading,
    error,
    passwordEmailForm: {
      email,
      setEmail,
      password,
      setPassword,
    },
    twoVerification: {
      loginToken,
      setLoginToken,
      isVerifyDialogOpen,
      setIsVerifyDialogOpen,
      verifyLogin2FA,
    },
  };
}

type LoginContextType = ReturnType<typeof useLoginState>;

const LoginContext = React.createContext<LoginContextType>(
  {} as LoginContextType
);

export function LoginProvider({ children }: { children: ReactNode }) {
  return (
    <LoginContext.Provider value={useLoginState()}>
      {children}
    </LoginContext.Provider>
  );
}

export function useLoginContext() {
  return useContext(LoginContext);
}
