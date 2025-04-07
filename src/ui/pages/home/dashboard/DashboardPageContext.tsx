import React, { useContext, useState, useEffect, ReactNode } from "react";

interface DashboardStats {
  totalUsers: number;
  activeProjects: number;
  completionRate: number;
}

function useDashboardState() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeProjects: 0,
    completionRate: 0,
  });

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStats({
        totalUsers: Math.floor(Math.random() * 1000),
        activeProjects: Math.floor(Math.random() * 100),
        completionRate: Math.floor(Math.random() * 100),
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    isLoading,
    refreshStats: fetchStats,
  };
}

type DashboardContextType = ReturnType<typeof useDashboardState>;

const DashboardContext = React.createContext<DashboardContextType>(
  {} as DashboardContextType
);

export function DashboardProvider({ children }: { children: ReactNode }) {
  return (
    <DashboardContext.Provider value={useDashboardState()}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  return useContext(DashboardContext);
}
