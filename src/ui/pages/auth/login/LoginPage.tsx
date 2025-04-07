import React from "react";
import { Link } from "react-router-dom";
import { LoginProvider, useLoginContext } from "./LoginPageContext";
import GoogleIcon from "@/ui/assets/google_icon";
import Button from "@/ui/global_components/base/Button";
import TextField from "@/ui/global_components/base/TextField";
import AuthenticatorVerifyDialog from "@/ui/global_components/feature/AuthenticatorVerifyDialog";

export function LoginPageRoute() {
  return (
    <LoginProvider>
      <LoginPage />
    </LoginProvider>
  );
}

export default function LoginPage() {
  const {
    login,
    isLoading,
    error,
    passwordEmailForm,
    handleGoogleSignIn,
    twoVerification,
  } = useLoginContext();
  const { email, setEmail, password, setPassword } = passwordEmailForm;
  const { isVerifyDialogOpen, setIsVerifyDialogOpen, verifyLogin2FA } =
    twoVerification;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign in to your account
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700 cursor-pointer"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isLoading}
          >
            Sign in
          </Button>
        </form>

        <div className="my-4 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <div className="px-3 text-sm text-gray-500">or</div>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <Button
          type="button"
          variant="secondary"
          className="w-full flex items-center justify-center gap-2"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
        >
          <GoogleIcon />
          Sign in with Google
        </Button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className="text-blue-600 hover:text-blue-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <AuthenticatorVerifyDialog
        isOpen={isVerifyDialogOpen}
        onClose={() => {
          setIsVerifyDialogOpen(false);
        }}
        title="Verify Login"
        description="This account is using 2FA method"
        onVerificationSubmit={async (verificationCode) => {
          return await verifyLogin2FA(verificationCode);
        }}
      />
    </>
  );
}
