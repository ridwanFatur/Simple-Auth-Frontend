import TwoFactorRepo from "@/data/remote/user_settings/two_factor_repo";
import { TwoFactorSettingModel } from "@/domain/models/two_factor_setting/two_factor_setting_model";
import { useToast } from "@/ui/features/toast/ToastContext";
import { useAppContext } from "@/ui/global_context/AppStateContext";
import React, {
  useContext,
  ReactNode,
  useEffect,
  useState,
  useMemo,
} from "react";

function useSettingsState() {
  const { user, setUser } = useAppContext();
  const toast = useToast();

  /** 2FA */
  const [twoFactorSettings, setTwoFactorSettings] = useState<
    TwoFactorSettingModel[]
  >([]);

  /** Authenticator Method */
  const authenticatorEnabled = useMemo(() => {
    return twoFactorSettings.some((item) => item.method == "authenticator");
  }, [twoFactorSettings]);
  const [authenticatorParam, setAuthenticatorParam] = useState<{
    qrCodeUrl: string;
    secretKey: string;
  }>();

  /** Dialog */
  const [isAuthenticatorSetupDialogOpen, setIsAuthenticatorSetupDialogOpen] =
    useState(false);
  const [isDisable2FADialogOpen, setIsDisable2FADialogOpen] = useState(false);
  const [
    isDisableAuthenticatorDialogOpen,
    setIsDisableAuthenticatorDialogOpen,
  ] = useState(false);
  const [isEnable2FADialogOpen, setIsEnable2FADialogOpen] = useState(false);

  async function fetchTwoFactorSettings() {
    try {
      const result = await TwoFactorRepo.getAvailableMethods();
      setTwoFactorSettings(result);
    } catch (e) {
      /** */
    }
  }

  async function handleToggleAuthenticatorSetting() {
    if (user?.enable_2fa) {
      toast.error("Disable 2FA first");
      return;
    }

    if (authenticatorEnabled) {
      setIsDisableAuthenticatorDialogOpen(true);
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
          setIsAuthenticatorSetupDialogOpen(true);
        }
      } catch (e) {
        /** */
      }
    }
  }

  useEffect(() => {
    fetchTwoFactorSettings();
  }, []);

  function handleToggle2FA() {
    if (!user) return;
    if (user.enable_2fa) {
      /** Deactivate */
      setIsDisable2FADialogOpen(true);
    } else {
      /** Activate */
      if (twoFactorSettings.length == 0) {
        toast.error("Have to enable one of the methods");
      } else {
        setIsEnable2FADialogOpen(true);
      }
    }
  }

  async function setupAuthenticatorApp(verificationCode: string) {
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

  async function disableAuthenticatorApp(verificationCode: string) {
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

  async function enable2FA() {
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

  async function disable2FA(verificationCode: string) {
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
    user,
    handleToggle2FA,
    twoFactorSettings,
    authenticatorEnabled,
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
  };
}

type SettingsContextType = ReturnType<typeof useSettingsState>;

const SettingsContext = React.createContext<SettingsContextType>(
  {} as SettingsContextType
);

export function SettingsProvider({ children }: { children: ReactNode }) {
  return (
    <SettingsContext.Provider value={useSettingsState()}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettingsContext() {
  return useContext(SettingsContext);
}
