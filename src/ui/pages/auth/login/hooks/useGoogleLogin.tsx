import { useEffect } from "react";
import { useGoogleLogin as useGoogleOAuthLogin } from "@react-oauth/google";
import { useSearchParams } from "react-router-dom";
import AuthRepo from "@/data/remote/user/auth_repo";
import { getExceptionMessages } from "@/data/helpers/clients/utility/exceptions";
import { UserWithTokenModel } from "@/domain/models/user/user_model";
import { FRONTEND_URL } from "@/config";

interface UseGoogleLoginProps {
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  handleResult: (result: UserWithTokenModel, type: string) => void;
}

export function useGoogleLogin({
  setIsLoading,
  setError,
  handleResult,
}: UseGoogleLoginProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const googleLogin = useGoogleOAuthLogin({
    onError: () => {},
    flow: "auth-code",
    ux_mode: "redirect",
    redirect_uri: `${FRONTEND_URL}/auth/login`,
    state: JSON.stringify(Object.fromEntries(searchParams.entries())),
  });

  async function loginWithGoogle(auth_code: string) {
    setIsLoading(true);
    setError(null);

    try {
      const result = await AuthRepo.GoogleMethod.signIn({
        auth_code,
      });
      handleResult(result, "google");
    } catch (error) {
      const messages = getExceptionMessages(error);
      setError(messages[0]);
      console.error("Google registration error:", error);
    } finally {
      setSearchParams({});
      setIsLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    googleLogin();
  }

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    if (code && state) {
      loginWithGoogle(code);
    }
  }, [searchParams]);

  return { loginWithGoogle, handleGoogleSignIn };
}
