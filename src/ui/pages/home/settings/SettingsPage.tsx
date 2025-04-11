import { SettingsProvider, useSettingsContext } from "./SettingsPageContext";
import { Shield } from "lucide-react";
import AuthenticatorVerifyDialog from "../../../global_components/feature/AuthenticatorVerifyDialog";
import Enable2FAConfirmationDialog from "./components/Enable2FAConfirmationDialog";
import AuthenticatorSetupView from "./components/AuthenticatorSetupView";

export function SettingsPageRoute() {
  return (
    <SettingsProvider>
      <SettingsPage />
    </SettingsProvider>
  );
}

export default function SettingsPage() {
  const { user, twoFactorAuthentication } = useSettingsContext();
  const {
    enable,
    disable,
    handleToggle,
    isDisableDialogOpen,
    setIsDisableDialogOpen,
    isEnableDialogOpen,
    setIsEnableDialogOpen,
  } = twoFactorAuthentication;

  if (!user) {
    return <></>;
  }

  return (
    <>
      <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <Shield className="text-blue-600 mr-2" size={24} />
          <h1 className="text-2xl font-bold text-gray-800">
            Security Settings
          </h1>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="font-medium text-gray-700">
                Two-Factor Authentication
              </div>
            </div>
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
              <input
                type="checkbox"
                id="toggle-2fa"
                className="absolute w-0 h-0 opacity-0"
                onClick={() => {
                  handleToggle();
                }}
                checked={user.enable_2fa}
                readOnly={true}
              />
              <label
                htmlFor="toggle-2fa"
                className={`flex items-center p-1 w-12 h-6 rounded-full cursor-pointer ${
                  user.enable_2fa ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                    user.enable_2fa ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </label>
              <span className="ml-2 text-sm text-gray-600">
                {user.enable_2fa ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>
        </div>

        <AuthenticatorSetupView />
      </div>
      <Enable2FAConfirmationDialog
        isOpen={isEnableDialogOpen}
        onClose={() => setIsEnableDialogOpen(false)}
        onConfirm={() => {
          return enable();
        }}
      />

      <AuthenticatorVerifyDialog
        isOpen={isDisableDialogOpen}
        onClose={() => setIsDisableDialogOpen(false)}
        onVerificationSubmit={async (verificationCode) => {
          return await disable(verificationCode);
        }}
        title="Disable 2FA"
        description="To disable this need to verify the code "
      />
    </>
  );
}
