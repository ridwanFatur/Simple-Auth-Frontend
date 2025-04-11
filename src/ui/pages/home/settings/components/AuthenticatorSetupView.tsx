import { CheckSquare } from "lucide-react";
import AuthenticatorSetupDialog from "./AuthenticatorSetupDialog";
import AuthenticatorVerifyDialog from "@/ui/global_components/feature/AuthenticatorVerifyDialog";
import { useSettingsContext } from "../SettingsPageContext";

export default function AuthenticatorSetupView() {
  const { authenticatorMethod } = useSettingsContext();
  const {
    isEnabled,
    disable,
    setup,
    handleToggle,
    authenticatorParam,
    isSetupDialogOpen,
    setIsSetupDialogOpen,
    isDisableDialogOpen,
    setIsDisableDialogOpen,
  } = authenticatorMethod;

  return (
    <>
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
              checked={isEnabled}
              readOnly={true}
              onClick={() => {
                handleToggle();
              }}
            />
            <label
              htmlFor="toggle-authenticator"
              className={`flex items-center p-1 w-12 h-6 rounded-full cursor-pointer ${
                isEnabled ? "bg-green-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                  isEnabled ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </label>
            <span className="ml-2 text-sm text-gray-600">
              {isEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>
        </div>
      </div>
      <AuthenticatorSetupDialog
        isOpen={isSetupDialogOpen && authenticatorParam !== undefined}
        onClose={() => setIsSetupDialogOpen(false)}
        authenticatorParam={authenticatorParam}
        onVerificationSubmit={async (verificationCode) => {
          await setup(verificationCode);
        }}
      />
      <AuthenticatorVerifyDialog
        isOpen={isDisableDialogOpen}
        onClose={() => setIsDisableDialogOpen(false)}
        onVerificationSubmit={async (verificationCode) => {
          return await disable(verificationCode);
        }}
        title="Disable Authenticator"
        description="To disable authenticator need to verify the code "
      />
    </>
  );
}
