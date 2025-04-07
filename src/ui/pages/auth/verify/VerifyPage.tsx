import { Link } from "react-router-dom";
import { VerifyProvider, useVerifyContext } from "./VerifyPageContext";
import Button from "@/ui/global_components/base/Button";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export function VerifyPageRoute() {
  return (
    <VerifyProvider>
      <VerifyPage />
    </VerifyProvider>
  );
}

export default function VerifyPage() {
  const { loading, error, user } = useVerifyContext();

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">
            Account Verification
          </h1>
          <p className="text-gray-600">
            {loading
              ? "Checking your verification status..."
              : error
              ? "There was a problem with your verification"
              : "Your account verification is complete"}
          </p>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="mb-4 h-16 w-16 animate-spin text-blue-500" />
            <p className="text-gray-600">Verifying your account...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-4">
            <AlertCircle className="mb-4 h-16 w-16 text-red-500" />
            <div className="mb-6 rounded-md bg-red-50 p-4 text-center">
              <p className="font-medium text-red-800">Error: {error}</p>
            </div>
            <div className="flex flex-col space-y-4">
              <Link to="/auth/login" className="w-full">
                <Button className="w-full ">Try again</Button>
              </Link>
              <Link to="/support" className="w-full">
                <Button variant="outline">Contact Support</Button>
              </Link>
            </div>
          </div>
        )}

        {!loading && !error && !user && (
          <div className="flex flex-col items-center justify-center py-4">
            <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
            <div className="mb-6 rounded-md bg-green-50 p-4 text-center">
              <p className="font-medium text-green-800">
                Your email has been verified successfully!
              </p>
            </div>
            <Link to="/auth/login" className="w-full">
              <Button className="w-full bg-blue-600 py-2 text-white hover:bg-blue-700">
                Log in to your account
              </Button>
            </Link>
          </div>
        )}

        {!loading && !error && user && (
          <div className="flex flex-col items-center justify-center py-4">
            <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
            <div className="mb-6 rounded-md bg-green-50 p-4 text-center">
              <p className="font-medium text-green-800">
                Your account is now fully verified!
              </p>
            </div>
            <Link to="/" className="w-full">
              <Button className="w-full bg-blue-600 py-2 text-white hover:bg-blue-700">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
