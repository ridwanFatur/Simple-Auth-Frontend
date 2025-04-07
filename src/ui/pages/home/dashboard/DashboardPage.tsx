import Button from "@/ui/global_components/base/Button";
import { DashboardProvider, useDashboardContext } from "./DashboardPageContext";
import Card from "@/ui/global_components/base/Card";

export function DashboardPageRoute() {
  return (
    <DashboardProvider>
      <DashboardPage />
    </DashboardProvider>
  );
}

export default function DashboardPage() {
  const { stats, isLoading, refreshStats } = useDashboardContext();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <Button variant="primary" onClick={refreshStats} isLoading={isLoading}>
          Refresh Data
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-32 animate-pulse bg-gray-200" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="p-4">
              <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
              <p className="text-3xl font-bold text-gray-800">
                {stats.totalUsers}
              </p>
            </div>
          </Card>
          <Card>
            <div className="p-4">
              <h3 className="text-gray-500 text-sm font-medium">
                Active Projects
              </h3>
              <p className="text-3xl font-bold text-gray-800">
                {stats.activeProjects}
              </p>
            </div>
          </Card>
          <Card>
            <div className="p-4">
              <h3 className="text-gray-500 text-sm font-medium">
                Completion Rate
              </h3>
              <p className="text-3xl font-bold text-gray-800">
                {stats.completionRate}%
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
