import { getExceptionMessages } from "@/data/helpers/clients/utility/exceptions";
import VerificationRepo from "@/data/remote/user_settings/verification_repo";
import { useAppContext } from "@/ui/global_context/AppStateContext";
import React, { useContext, ReactNode, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function useVerifyState() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const { code, email } = useParams();
  const { user, setUser } = useAppContext();

  async function load() {
    if (user && user.verified) {
      setLoading(false);
    }
    if (!code || !email) return;

    setLoading(true);
    try {
      await VerificationRepo.verify({
        code,
        email,
      });

      if (user) {
        setUser({
          ...user,
          verified: true,
        });
      }
    } catch (error) {
      const messages = getExceptionMessages(error);
      setError(messages[0]);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (code && email) {
      load();
    }
  }, [code, email]);

  return { loading, setLoading, error, setError, user };
}

type VerifyContextType = ReturnType<typeof useVerifyState>;

const VerifyContext = React.createContext<VerifyContextType>(
  {} as VerifyContextType
);

export function VerifyProvider({ children }: { children: ReactNode }) {
  return (
    <VerifyContext.Provider value={useVerifyState()}>
      {children}
    </VerifyContext.Provider>
  );
}

export function useVerifyContext() {
  return useContext(VerifyContext);
}
