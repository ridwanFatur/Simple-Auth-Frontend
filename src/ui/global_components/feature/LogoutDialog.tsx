import BaseDialog from "../base/BaseDialog";
import Button from "../base/Button";

interface LogoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function LogoutDialog({
  isOpen,
  onClose,
  onLogout,
}: LogoutDialogProps) {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <BaseDialog
      isOpen={isOpen}
      onClose={onClose}
      className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
    >
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Confirm Logout</h2>
        <p className="text-gray-600">
          Are you sure you want to log out? You will need to log in again to
          access your account.
        </p>

        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="secondary" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="md" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </BaseDialog>
  );
}
