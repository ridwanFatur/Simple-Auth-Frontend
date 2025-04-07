import { useEffect, useState } from "react";
import BaseDialog, {
  BaseDialogProps,
} from "@/ui/global_components/base/BaseDialog";
import Button from "@/ui/global_components/base/Button";

export default function AuthenticatorVerifyDialog({
  isOpen,
  onClose,
  onVerificationSubmit,
  title,
  description,
}: BaseDialogProps & {
  title: string;
  description: string;
  onVerificationSubmit: (verificationCode: string) => Promise<boolean>;
}) {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setError("");
      setIsLoading(false);
      setVerificationCode("");
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!verificationCode) {
      setError("Please enter the verification code");
      return;
    }

    setIsLoading(true);
    setError("");

    const result = await onVerificationSubmit(verificationCode);
    if (result) {
      onClose();
    } else {
      setError("Invalid verification code. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <BaseDialog
      isOpen={isOpen}
      onClose={onClose}
      className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="verification-code"
            className="block text-sm font-medium text-gray-700"
          >
            Verification Code
          </label>
          <input
            id="verification-code"
            type="text"
            placeholder="Enter 6-digit code"
            value={verificationCode}
            onChange={(e) =>
              setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={6}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <Button
            variant="secondary"
            size="md"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleSubmit}
            disabled={isLoading || verificationCode.length !== 6}
          >
            {isLoading ? "Verifying..." : "Verify & Enable"}
          </Button>
        </div>
      </div>
    </BaseDialog>
  );
}
