import { SettingsProvider, useSettingsContext } from "./SettingsPageContext";
import { Shield, CheckSquare } from "lucide-react";
import AuthenticatorSetupDialog from "./components/AuthenticatorSetupDialog";
import AuthenticatorVerifyDialog from "../../../global_components/feature/AuthenticatorVerifyDialog";
import Enable2FAConfirmationDialog from "./components/Enable2FAConfirmationDialog";

export function SettingsPageRoute() {
  return (
    <SettingsProvider>
      <SettingsPage />
    </SettingsProvider>
  );
}

export default function SettingsPage() {
  const {
    user,
    authenticatorEnabled,
    handleToggle2FA,
    handleToggleAuthenticatorSetting,
    isAuthenticatorSetupDialogOpen,
    setIsAuthenticatorSetupDialogOpen,
    authenticatorParam,
    setupAuthenticatorApp,
    isDisable2FADialogOpen,
    setIsDisable2FADialogOpen,
    isDisableAuthenticatorDialogOpen,
    setIsDisableAuthenticatorDialogOpen,
    disableAuthenticatorApp,
    isEnable2FADialogOpen,
    setIsEnable2FADialogOpen,
    enable2FA,
    disable2FA,
  } = useSettingsContext();

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
                  handleToggle2FA();
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

        <div className="border rounded-lg divide-y">
          <h2 className="p-4 font-medium text-gray-700 bg-gray-50 rounded-t-lg">
            Authentication Methods
          </h2>

          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <CheckSquare className="text-gray-600 mr-3" size={20} />
              <div>
                <div className="font-medium">Authenticator App</div>
                <div className="text-sm text-gray-500">
                  Use Google Authenticator or similar apps
                </div>
              </div>
            </div>
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
              <input
                type="checkbox"
                id="toggle-authenticator"
                className="absolute w-0 h-0 opacity-0"
                checked={authenticatorEnabled}
                readOnly={true}
                onClick={() => {
                  handleToggleAuthenticatorSetting();
                }}
              />
              <label
                htmlFor="toggle-authenticator"
                className={`flex items-center p-1 w-12 h-6 rounded-full cursor-pointer ${
                  authenticatorEnabled ? "bg-green-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                    authenticatorEnabled ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </label>
              <span className="ml-2 text-sm text-gray-600">
                {authenticatorEnabled ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Enable2FAConfirmationDialog
        isOpen={isEnable2FADialogOpen}
        onClose={() => setIsEnable2FADialogOpen(false)}
        onConfirm={() => {
          return enable2FA();
        }}
      />
      <AuthenticatorSetupDialog
        isOpen={isAuthenticatorSetupDialogOpen}
        onClose={() => setIsAuthenticatorSetupDialogOpen(false)}
        authenticatorParam={authenticatorParam}
        onVerificationSubmit={async (verificationCode) => {
          await setupAuthenticatorApp(verificationCode);
        }}
      />
      <AuthenticatorVerifyDialog
        isOpen={isDisable2FADialogOpen}
        onClose={() => setIsDisable2FADialogOpen(false)}
        onVerificationSubmit={async (verificationCode) => {
          return await disable2FA(verificationCode);
        }}
        title="Disable 2FA"
        description="To disable this need to verify the code "
      />
      <AuthenticatorVerifyDialog
        isOpen={isDisableAuthenticatorDialogOpen}
        onClose={() => setIsDisableAuthenticatorDialogOpen(false)}
        onVerificationSubmit={async (verificationCode) => {
          return await disableAuthenticatorApp(verificationCode);
        }}
        title="Disable Authenticator"
        description="To disable authenticator need to verify the code "
      />
    </>
  );
}
