import React from "react";
import { Link } from "react-router-dom";
import { RegisterProvider, useRegisterContext } from "./RegisterPageContext";
import GoogleIcon from "@/ui/assets/google_icon";
import Button from "@/ui/global_components/base/Button";
import TextField from "@/ui/global_components/base/TextField";

export function RegisterPageRoute() {
  return (
    <RegisterProvider>
      <RegisterPage />
    </RegisterProvider>
  );
}

export default function RegisterPage() {
  const { register, handleGoogleSignUp, isLoading, error, passwordEmailForm } =
    useRegisterContext();

  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
  } = passwordEmailForm;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    await register(name, email, password);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Create a new account
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          required
        />

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
          placeholder="Create a password"
          required
        />

        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          required
          error={password !== confirmPassword ? "Passwords do not match" : ""}
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isLoading || password !== confirmPassword}
        >
          Sign up
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
        onClick={handleGoogleSignUp}
        disabled={isLoading}
      >
        <GoogleIcon />
        Sign up with Google
      </Button>

      {/* <Button
        type="button"
        variant="secondary"
        className="w-full flex items-center justify-center gap-2 mt-2"
        onClick={handleMicrosoftSignUp}
        disabled={isLoading}
      >
        <MicrosoftIcon />
        Sign up with Microsoft
      </Button> */}

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
