import { useLocalStorage } from "@/data/helpers/base/local_storage_utility";
import UserRepo from "@/data/remote/user/user_repo";
import { UserModel } from "@/domain/models/user/user_model";
import React, { useContext, useEffect } from "react";
import { ReactNode, useState } from "react";

function useAppState() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState<UserModel>();
  const storage = useLocalStorage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  async function fetchAccount() {
    if (!storage.get("accessToken")) return;

    try {
      const result = await UserRepo.getUser();
      setUser(result);
    } catch {
      /** pass */
    }
  }

  async function logout() {
    storage.set({
      refreshToken: undefined,
      accessToken: undefined,
    });
    setUser(undefined);
  }

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized]);

  async function initialize() {
    /** Call only once when app is initially started */
    await fetchAccount();
    setIsInitialized(true);
  }

  return {
    logout,
    user,
    isInitialized,
    setUser,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  };
}

type AppStateController = ReturnType<typeof useAppState>;

export default function AppStateProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AppStateContext.Provider value={useAppState()}>
      {children}
    </AppStateContext.Provider>
  );
}

export const AppStateContext: React.Context<AppStateController> =
  React.createContext({} as AppStateController);

export function useAppContext() {
  return useContext(AppStateContext);
}
