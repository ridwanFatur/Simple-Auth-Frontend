import AuthRepo from "@/data/remote/user/auth_repo";
import { getExceptionMessages } from "@/data/helpers/clients/utility/exceptions";
import { UserWithTokenModel } from "@/domain/models/user/user_model";

interface UsePasswordLoginProps {
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  handleResult: (result: UserWithTokenModel, type: string) => void;
}

export function usePasswordLogin({
  setIsLoading,
  setError,
  handleResult,
}: UsePasswordLoginProps) {
  async function login(email: string, password: string) {
    setIsLoading(true);
    setError(null);

    try {
      const result = await AuthRepo.PasswordMethod.signIn({
        email,
        password,
      });
      handleResult(result, "email");
    } catch (error) {
      const messages = getExceptionMessages(error);
      setError(messages[0]);
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return { login };
}
