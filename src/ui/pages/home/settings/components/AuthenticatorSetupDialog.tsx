import { useEffect, useState } from "react";
import BaseDialog, {
  BaseDialogProps,
} from "@/ui/global_components/base/BaseDialog";
import Button from "@/ui/global_components/base/Button";
import QRCode from "react-qr-code";

export default function AuthenticatorSetupDialog({
  isOpen,
  onClose,
  onVerificationSubmit,
  authenticatorParam,
}: BaseDialogProps & {
  authenticatorParam?: {
    qrCodeUrl: string;
    secretKey: string;
  };
  onVerificationSubmit: (verificationCode: string) => Promise<void>;
}) {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsReady(false);
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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

    try {
      await onVerificationSubmit(verificationCode);
      onClose();
    } catch (err) {
      setError("Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseDialog
      isOpen={isOpen}
      onClose={onClose}
      className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Set Up Two-Factor Authentication
          </h2>
          <p className="text-gray-600 mt-2">
            Scan the QR code below with your authenticator app to add your
            account.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="border border-gray-200 p-2 rounded-md bg-white">
            {authenticatorParam && (
              <>
                {isReady ? (
                  <QRCode
                    value={authenticatorParam.qrCodeUrl}
                    size={192}
                    level="H"
                    className="m-2"
                  />
                ) : (
                  <div className="m-2 w-48 h-48" />
                )}
              </>
            )}
          </div>

          <div className="text-center w-full">
            <p className="text-sm text-gray-600 mb-1">
              Or enter this code manually:
            </p>
            <p className="font-mono bg-gray-100 p-2 rounded-md select-all text-center">
              {authenticatorParam?.secretKey}
            </p>
          </div>
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
