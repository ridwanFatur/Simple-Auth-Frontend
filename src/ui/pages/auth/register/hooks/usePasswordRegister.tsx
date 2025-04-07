import AuthRepo from "@/data/remote/user/auth_repo";
import { getExceptionMessages } from "@/data/helpers/clients/utility/exceptions";
import { UserWithTokenModel } from "@/domain/models/user/user_model";

interface UsePasswordRegisterProps {
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  handleResult: (result: UserWithTokenModel) => void;
}

export function usePasswordRegister({
  setIsLoading,
  setError,
  handleResult,
}: UsePasswordRegisterProps) {
  async function register(name: string, email: string, password: string) {
    setIsLoading(true);
    setError(null);

    try {
      const result = await AuthRepo.PasswordMethod.signUp({
        full_name: name,
        email,
        password,
        role: "user",
      });
      handleResult(result);
    } catch (error) {
      const messages = getExceptionMessages(error);
      setError(messages[0]);
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return { register };
}
