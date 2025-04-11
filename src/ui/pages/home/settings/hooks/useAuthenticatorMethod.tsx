import TwoFactorRepo from "@/data/remote/user_settings/two_factor_repo";
import { TwoFactorSettingModel } from "@/domain/models/two_factor_setting/two_factor_setting_model";
import { useToast } from "@/ui/features/toast/ToastContext";
import { useAppContext } from "@/ui/global_context/AppStateContext";
import { useMemo, useState } from "react";

interface UseAuthenticatorMethodProps {
  twoFactorSettings: TwoFactorSettingModel[];
  fetchTwoFactorSettings: () => Promise<void>;
}

export function useAuthenticatorMethod({
  twoFactorSettings,
  fetchTwoFactorSettings,
}: UseAuthenticatorMethodProps) {
  const { user } = useAppContext();
  const toast = useToast();

  const isEnabled = useMemo(() => {
    return twoFactorSettings.some((item) => item.method == "authenticator");
  }, [twoFactorSettings]);
  const [authenticatorParam, setAuthenticatorParam] = useState<{
    qrCodeUrl: string;
    secretKey: string;
  }>();

  /** Dialog */
  const [isSetupDialogOpen, setIsSetupDialogOpen] = useState(false);
  const [isDisableDialogOpen, setIsDisableDialogOpen] = useState(false);

  async function handleToggle() {
    if (user?.enable_2fa) {
      toast.error("Disable 2FA first");
      return;
    }

    if (isEnabled) {
      setIsDisableDialogOpen(true);
    } else {
      try {
        const result = await TwoFactorRepo.addMethod({
          method: "authenticator",
        });
        const { qr_url, secret } = result;
        if (qr_url && secret) {
          setAuthenticatorParam({
            qrCodeUrl: qr_url,
            secretKey: secret,
          });
          setIsSetupDialogOpen(true);
        }
      } catch (e) {
        /** */
      }
    }
  }

  async function setup(verificationCode: string) {
    try {
      await TwoFactorRepo.enableMethod({
        otp_code: verificationCode,
        method: "authenticator",
      });
      await fetchTwoFactorSettings();
      toast.success("Success enable authenticator");
      return true;
    } catch {
      return false;
    }
  }

  async function disable(verificationCode: string) {
    try {
      await TwoFactorRepo.disableMethod({
        otp_code: verificationCode,
        method: "authenticator",
      });
      await fetchTwoFactorSettings();
      toast.success("Success disable authenticator");
      return true;
    } catch {
      return false;
    }
  }

  return {
    isEnabled,
    disable,
    setup,
    handleToggle,
    authenticatorParam,
    setAuthenticatorParam,
    isSetupDialogOpen,
    setIsSetupDialogOpen,
    isDisableDialogOpen,
    setIsDisableDialogOpen,
  };
}
