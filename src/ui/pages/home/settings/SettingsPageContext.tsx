import TwoFactorRepo from "@/data/remote/user_settings/two_factor_repo";
import { TwoFactorSettingModel } from "@/domain/models/two_factor_setting/two_factor_setting_model";
import { useAppContext } from "@/ui/global_context/AppStateContext";
import React, { useContext, ReactNode, useEffect, useState } from "react";
import { useTwoFactorAuthentication } from "./hooks/useTwoFactorAuthentication";
import { useAuthenticatorMethod } from "./hooks/useAuthenticatorMethod";

function useSettingsState() {
  const { user } = useAppContext();
  const [twoFactorSettings, setTwoFactorSettings] = useState<
    TwoFactorSettingModel[]
  >([]);

  async function fetchTwoFactorSettings() {
    try {
      const result = await TwoFactorRepo.getAvailableMethods();
      setTwoFactorSettings(result);
    } catch (e) {
      /** */
    }
  }

  useEffect(() => {
    fetchTwoFactorSettings();
  }, []);

  const twoFactorAuthentication = useTwoFactorAuthentication({
    twoFactorSettings,
  });
  const authenticatorMethod = useAuthenticatorMethod({
    twoFactorSettings,
    fetchTwoFactorSettings,
  });

  return {
    user,
    twoFactorSettings,
    twoFactorAuthentication,
    authenticatorMethod,
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
