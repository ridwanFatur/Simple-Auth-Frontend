import TwoFactorRepo from "@/data/remote/user_settings/two_factor_repo";
import { TwoFactorSettingModel } from "@/domain/models/two_factor_setting/two_factor_setting_model";
import { useToast } from "@/ui/features/toast/ToastContext";
import { useAppContext } from "@/ui/global_context/AppStateContext";
import { useState } from "react";

interface UseTwoFactorAuthenticationProps {
  twoFactorSettings: TwoFactorSettingModel[];
}

export function useTwoFactorAuthentication({
  twoFactorSettings,
}: UseTwoFactorAuthenticationProps) {
  const { user, setUser } = useAppContext();
  const toast = useToast();

  /** Dialog */
  const [isDisableDialogOpen, setIsDisableDialogOpen] = useState(false);
  const [isEnableDialogOpen, setIsEnableDialogOpen] = useState(false);

  function handleToggle() {
    if (!user) return;
    if (user.enable_2fa) {
      /** Deactivate */
      setIsDisableDialogOpen(true);
    } else {
      /** Activate */
      if (twoFactorSettings.length == 0) {
        toast.error("Have to enable one of the methods");
      } else {
        setIsEnableDialogOpen(true);
      }
    }
  }

  async function enable() {
    if (!user) return false;

    try {
      await TwoFactorRepo.enable();
      setUser({
        ...user,
        enable_2fa: true,
      });
      toast.success("Success enable 2FA");
      return true;
    } catch {
      return false;
    }
  }

  async function disable(verificationCode: string) {
    if (!user) return false;

    try {
      await TwoFactorRepo.disable({
        otp_code: verificationCode,
        method: "authenticator",
      });
      setUser({
        ...user,
        enable_2fa: false,
      });
      toast.success("Success disable 2FA");
      return true;
    } catch {
      return false;
    }
  }

  return {
    enable,
    disable,
    handleToggle,
    isDisableDialogOpen,
    setIsDisableDialogOpen,
    isEnableDialogOpen,
    setIsEnableDialogOpen,
  };
}
