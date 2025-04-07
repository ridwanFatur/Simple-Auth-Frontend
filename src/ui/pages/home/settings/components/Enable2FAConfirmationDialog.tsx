import { useState } from "react";
import BaseDialog, {
  BaseDialogProps,
} from "@/ui/global_components/base/BaseDialog";
import Button from "@/ui/global_components/base/Button";

export default function Enable2FAConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
}: BaseDialogProps & {
  onConfirm: () => Promise<boolean>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");

    const result = await onConfirm();
    if (result) {
      onClose();
    } else {
      setError("An error occurred. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <BaseDialog
      isOpen={isOpen}
      onClose={onClose}
      className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
    >
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Enable Two-Factor Authentication
        </h2>
        <p className="text-gray-600">
          Are you sure you want to enable two-factor authentication for your
          account? This will add an extra layer of security.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4">
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
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Continue"}
          </Button>
        </div>
      </div>
    </BaseDialog>
  );
}
